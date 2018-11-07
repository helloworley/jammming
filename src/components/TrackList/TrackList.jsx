import React from "react";
import Track from "../Track/Track";

class TrackList extends React.Component {

  render() {

    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track 
              title={track.title} 
              artist={track.artist} 
              album={track.album}
              type={this.props.type}
              onClick={this.props.onClick}  />
          })
        }
      </div>
    );
  }
}

export default TrackList;