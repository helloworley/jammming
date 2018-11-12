import React from "react";
import "./Searchbar.css";

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(term) {
    this.props.onSearch(term);
  }

  handleTermChange(e) {
    this.props.onSearchTermChange(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;