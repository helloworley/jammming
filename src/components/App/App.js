import React, { Component } from "react";
import "./App.css";
import SearchBar from "../Searchbar/Searchbar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          title: "Mountaintops In Caves",
          artist: "Talkdemonic",
          album: "Beat Romantic",
          uri: "uri1",
          id: "1"
        },
        {
          title: "Chihiro",
          artist: "Yoste",
          album: "Chihiro",
          uri: "uri2",
          id: "2"
        },
        {
          title: "Northern Lights",
          artist: "Lights & Motion",
          album: "Chronicle",
          uri: "uri3",
          id: "3"
        }
      ],
      newPlayList: [
      ],
      playlistName: "New Playlist"
    };

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(name) {
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

  savePlaylist() {
    const trackURIs = this.state.searchResults.map(searchResult => {
      return searchResult.uri;
    });
    console.log(trackURIs);
  }

  search(term) {
    console.log(term);
  }

  render() {

    return (
      <div className="App">
        <SearchBar 
          onSearch={this.search}
        />
        <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack} 
            isRemoval={false} 
            />
          <Playlist 
            onSave={this.savePlaylist}
            onNameChange={this.updatePlaylistName} 
            playlistName={this.state.playlistName} 
            newPlayList={this.state.newPlayList} 
            isRemoval={true} 
            onRemove={this.removeTrack}
            />
        </div>
      </div>
    );
  }
}

export default App;
