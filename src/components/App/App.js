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
          album: "Beat Romantic",
          id: "1"
        },
        {
          title: "Chihiro",
          artist: "Yoste",
          album: "Chihiro",
          id: "2"
        },
        {
          title: "Northern Lights",
          artist: "Lights & Motion",
          album: "Chronicle",
          id: "3"
        }
      ],
      newPlayList: [
      ],
      playlistName: "New Playlist"
    };

    this.handleChangePlaylistName = this.handleChangePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  handleChangePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  addTrack(track) {
    if (this.state.newPlayList.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState({
        newPlayList: [...this.state.newPlayList, track]
      });
    }
  }

  removeTrack(selectedTrack) {
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
          <SearchResults 
            tracks={this.state.searchResultTracks} 
            onAdd={this.addTrack} 
            isRemoval={false} />
          <Playlist 
            onChange={this.handleChangePlaylistName} 
            playlistName={this.state.playlistName} 
            newPlayList={this.state.newPlayList} 
            isRemoval={true} 
            onRemove={this.removeTrack}/>
        </div>
      </div>
    );
  }
}

export default App;
