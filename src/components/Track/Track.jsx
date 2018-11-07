import React from "react";

class Track extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const songInfo = {
      title: `${this.props.title}`,
      artist: `${this.props.artist}`,
      album: `${this.props.album}`
    };
    this.props.onClick(songInfo);
  }
  
  
  render() {

    const type = this.props.type;
    let trackAction;
    type === "search-result" ? trackAction = '+' : trackAction = '—';


    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.title}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleChange}>{trackAction}</a>
      </div>
    );
  }
}

export default Track;