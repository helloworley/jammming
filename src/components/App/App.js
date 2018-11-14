import React, { Component } from "react";
import "./App.css";
import SearchBar from "../Searchbar/Searchbar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      newPlayList: [],
      playlistName: "New Playlist",
      searchTerm: ""
    };

    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  addTrack(trackToAdd) {
    if (
      this.state.newPlayList.find(
        existingTrack => existingTrack.track === trackToAdd.track
      )
    ) {
      return;
    } else {
      this.setState({ newPlayList: [...this.state.newPlayList, trackToAdd] });
    }
  }

  removeTrack(selectedTrack) {
    console.log("removing", selectedTrack);
    const updatedPlayList = this.state.newPlayList.filter(currentTrack => {
      return JSON.stringify(currentTrack) !== JSON.stringify(selectedTrack);
    });

    this.setState({ newPlayList: [...updatedPlayList] });
  }

  savePlaylist() {
    if (this.state.newPlayList.length >= 1) {
      const newPlayListURIs = this.state.newPlayList.map(track => {
        return track.uri;
      });
      Spotify.savePlaylist(this.state.playlistName, newPlayListURIs);
      this.updatePlaylistName("New Playlist");
      this.setState({ newPlayList: [] });
    }
  }

  search() {
    Spotify.search(this.state.searchTerm).then(searchResults => {
      console.log(searchResults);
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          onSearch={this.search}
          onSearchTermChange={this.updateSearchTerm}
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
