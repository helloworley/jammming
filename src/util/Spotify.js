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
      this.redirectToLogin();
    }
  },

  search(searchTerm) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    // if there's no access token, retrieve it
    if (!accessToken) {
      this.getAccessToken();
    }

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed.");
        },
        networkError => {
          console.log(networkError.message);
        }
      )
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
    const endpoint = "https://api.spotify.com/v1/me";
    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed.");
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        return jsonResponse.id;
      });
  },

  createNewPlaylist(playListName, userID) {
    const playListEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    return fetch(playListEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: playListName
      })
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed.");
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        return jsonResponse.id;
      });
  },

  addSongsToNewPlaylist(userID, playListID, trackURIs) {
    const addToNewPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`;
    return fetch(addToNewPlaylistEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        uris: trackURIs
      })
    }).then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request failed.");
      },
      networkError => {
        console.log(networkError.message);
      }
    );
  },

  savePlaylist(playListName, trackURIs) {
    if (!playListName && !trackURIs) {
      return;
    }
    let userID;
    let playListID;

    // first get the user id
    this.getUserId()
      .then(response => {
        userID = response;
      })
      .then(() => {
        // then use the user id to create a new playlist
        this.createNewPlaylist(playListName, userID).then(response => {
          playListID = response;
          // then add the songs in the trackURIs array to the playlist
          this.addSongsToNewPlaylist(userID, playListID, trackURIs);
        });
      });
  }
};

export default Spotify;
