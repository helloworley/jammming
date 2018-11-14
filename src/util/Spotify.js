// implicit grant flow returns a user's access token in the url
const clientID = "932fa560fa1848d5860ecd0080fbf963";
const redirectURI = "http://localhost:3000/";
const currentLocation = window.location.href;
let accessToken;
let expiresIn;

const Spotify = {
  redirectToLogin() {
    let scopes;
    const endpoint = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&state=123${
      scopes ? "&scope=" + encodeURIComponent(scopes) : ""
    }`;
    window.location.replace(endpoint);
  },

  getAccessToken() {
    console.log(accessToken);
    if (accessToken) {
      // Return the access token if it already exists
      return accessToken;
    } else if (window.location.href.includes("access_token")) {
      // else check if the access token is in the URL
      const expiresInObj = currentLocation.match(/expires_in=([^&]*)/);
      const accessTokenObj = currentLocation.match(/access_token=([^&]*)/);

      if (expiresInObj && accessTokenObj) {
        accessToken = accessTokenObj[0].split("access_token=").pop();
        expiresIn = expiresInObj[0].split("expires_in=").pop();
        // Set the access token to expire at the value for expiration time
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
        window.history.pushState("Access Token", null, "/");
      }
      return accessToken;
    } else {
      // else redirect the user to the Spotify OAuth login
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => {
            return {
              track: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
        } else {
          return [];
        }
      });
  },

  getUserId() {
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.id;
      });
  },

  createNewPlaylist(playListName, userID) {
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: playListName
      })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.id;
      });
  },

  addSongsToNewPlaylist(userID, playListID, trackURIs) {
    return fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          uris: trackURIs
        })
      }
    ).then(response => {
      return response.json();
    });
  },

  savePlaylist(playListName, trackURIs) {
    if (!playListName && !trackURIs) {
      return;
    }
    let userID;
    let playListID;

    this.getUserId()
      .then(response => {
        userID = response;
      })
      .then(() => {
        this.createNewPlaylist(playListName, userID).then(response => {
          playListID = response;
          this.addSongsToNewPlaylist(userID, playListID, trackURIs);
        });
      });
  }
};

export default Spotify;
