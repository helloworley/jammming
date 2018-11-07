import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/Searchbar/Searchbar';
import TrackList from './components/TrackList/TrackList';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResultTracks: [
        {
          title: 'Mountaintops In Caves',
          artist: 'Talkdemonic',
          album: 'Beat Romantic'
        },
        {
          title: 'Chihiro',
          artist: 'Yoste',
          album: 'Chihiro'
        },
        {
          title: 'Northern Lights',
          artist: 'Lights & Motion',
          album: 'Chronicle'
        }
      ],
      newPlayList: [

      ]
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar />
        <div class="App-playlist">
          <div class="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.state.searchResultTracks} />
          </div>
          <div class="Playlist">
            <input value='New Playlist' />
            <TrackList tracks={this.state.newPlayList} />
            <a class="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
