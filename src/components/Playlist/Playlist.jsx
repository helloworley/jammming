import React from "react";
import "./Playlist.css";

class Playlist extends React.Component {
  render () {
    return (
      <div className="Playlist">
        <input value="New Playlist"/>
        {/* Add a tracklist component */}
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
