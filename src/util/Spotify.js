// implicit grant flow returns a user's access token in the url

const redirectURI = "http://localhost:3000/";
let accessToken;
let expiresIn;

const currentLocation = window.location.href;

const Spotify = {
  redirectToLogin() {
    const endpoint = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&state=123`;
    window.location.replace(endpoint);
  },

  getAccessToken() {
    if (accessToken) {
      // Return the access token if it already exists
      return accessToken;
    } else if (window.location.href.includes('access_token')) {
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
    } else {
      console.log(searchTerm);
      // return fetch(endpoint).then(
      //   response => {
      //     if (response.ok) {
      //       let jsonResponse = response.json();
      //       if (jsonResponse) {
      //         const trackList = jsonResponse.map(track => {
      //           const trackArray = {
      //             track: track.id,
      //             name: track.name,
      //             artist: track.artists[0].name,
      //             album: track.album.name,
      //             uri: track.uri
      //           };
      //           return trackArray;
      //         });
      //         return trackList;
      //       } else {
      //         return [];
      //       }
      //     }
      //     throw new Error("Request failed!");
      //   },
      //   networkError => {
      //     console.log(networkError.message);
      //   }
      // );
    }
  }
};

export default Spotify;
