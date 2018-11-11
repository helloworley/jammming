import React, { Component } from "react";
import "./App.css";
import SearchBar from "../Searchbar/Searchbar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

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
      ],
      playlistName: "New Playlist"
    };

    this.handleChangePlaylistName = this.handleChangePlaylistName.bind(this);
    this.handleAddToPlayList = this.handleAddToPlayList.bind(this);
    this.handleRemoveFromPlayList = this.handleRemoveFromPlayList.bind(this);
  }

  handleChangePlaylistName(name) {
    this.setState({
      playlistName: name
    });
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
          <SearchResults tracks={this.state.searchResultTracks} onClick={this.handleAddToPlayList} />
          <Playlist onChange={this.handleChangePlaylistName} playlistName={this.state.playlistName} newPlayList={this.state.newPlayList} type="remove-result" onClick={this.handleRemoveFromPlayList}/>
        </div>
      </div>
    );
  }
}

export default App;
