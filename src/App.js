import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/Searchbar/Searchbar";
import TrackList from "./components/TrackList/TrackList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultTracks: [
        {
          title: "Mountaintops In Caves",
          artist: "Talkdemonic",
          album: "Beat Romantic"
        },
        {
          title: "Chihiro",
          artist: "Yoste",
          album: "Chihiro"
        },
        {
          title: "Northern Lights",
          artist: "Lights & Motion",
          album: "Chronicle"
        }
      ],
      newPlayList: [
      ]
    };

    this.handleAddToPlayList = this.handleAddToPlayList.bind(this);
    this.handleRemoveFromPlayList = this.handleRemoveFromPlayList.bind(this);
  }

  handleAddToPlayList(songObject) {
    this.setState({
      newPlayList: [...this.state.newPlayList, songObject]
    });
  }

  handleRemoveFromPlayList(selectedTrack) {
    const updatedPlayList = this.state.newPlayList.filter(currentTrack => {
      return JSON.stringify(currentTrack) !== JSON.stringify(selectedTrack);
    });

    this.setState({
      newPlayList: [...updatedPlayList]
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <div class="SearchResults">
            <h2>Results</h2>
            <TrackList
              tracks={this.state.searchResultTracks}
              type="search-result"
              onClick={this.handleAddToPlayList}
            />
          </div>
          <div className="Playlist">
            <input value="New Playlist" />
            <TrackList
              tracks={this.state.newPlayList}
              type="remove-result"
              onClick={this.handleRemoveFromPlayList}
            />
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
