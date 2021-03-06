import React from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render () {

    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
          <TrackList 
            tracks={this.props.newPlayList}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove}
          />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
