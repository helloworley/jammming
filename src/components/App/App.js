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
          <SearchResults searchResults={this.state.searchResults} onClick={this.handleAddToPlayList} />
          <Playlist newPlayList={this.state.newPlayList} type="remove-result" onClick={this.handleRemoveFromPlayList}/>
        </div>
      </div>
    );
  }
}

export default App;
