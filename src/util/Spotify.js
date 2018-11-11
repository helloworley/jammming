import SearchBar from "../components/Searchbar/Searchbar";

// implicit grant flow returns a user's access token in the url

const clientID = "";
const redirectURI = "http://localhost:3000/";
let accessToken;
let expiresIn;

const currentLocation = window.location.href;
const accessTokenRegEx = "";
const expiresInRegEx = "";

const Spotify = {
  redirectToLogin() {
    const endpoint = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&state=123`;
    window.location.replace(endpoint);
  },

  onRender() {
    const expiresInObj = currentLocation.match(/expires_in=([^&]*)/);
    const accessTokenObj = currentLocation.match(/access_token=([^&]*)/);
    if (!accessToken && !expiresIn) {
      if (expiresInObj && accessTokenObj) {
        expiresIn = expiresInObj[0].split("expires_in=").pop();
        accessToken = accessTokenObj[0].split("access_token=").pop();
        // Set the access token to expire at the value for expiration time
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
        window.history.pushState("Access Token", null, "/");
      }
    }

    console.log("access token:", accessToken);
    console.log("expires in:", expiresIn);
  },

  getAccessToken() {
    if (accessToken) {
      // Return the access token if it already exists
      console.log("1", accessToken);
      return accessToken;
    } else if (!accessToken) {
      // Get the

      if (!expiresIn && !accessToken) {
        this.redirectToLogin();
      }
    } else {
      // Access token variable is empty and is not in the URL.
      window.location.replace(
        `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      );
      console.log("3", accessToken);
    }
  },

  search(searchTerm) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    return fetch(endpoint).then(
      response => {
        if (response.ok) {
          let jsonResponse = response.json();
          if (jsonResponse) {
            const trackList = jsonResponse.map(track => {
              const trackArray = {
                track: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              };
              return trackArray;
            });
            return trackList;
          } else {
            return [];
          }
        }
        throw new Error("Request failed!");
      },
      networkError => {
        console.log(networkError.message);
      }
    );
  }
};

export default Spotify;
