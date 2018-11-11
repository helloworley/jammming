import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render () {

    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleChange} />
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
