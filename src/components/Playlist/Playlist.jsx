import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {
  render () {
    return (
      <div className="Playlist">
        <input value="New Playlist"/>
          <TrackList 
            tracks={this.props.newPlayList}
            type="remove-result"
            onClick={this.props.onClick}
          />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;