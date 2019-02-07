import React, { Component } from 'react';
import './searchPanel.css';

class SearchPanel extends Component {
  state = {
    searchTerm: ''
  };

  onSearchChange = e => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.props.onSearchChange(searchTerm);
  };

  render() {
    return (
      <input
        type="searchTerm"
        placeholder="Search"
        className="form-control search-input"
        value={this.state.searchTerm}
        onChange={this.onSearchChange}
      />
    );
  };
}

export default SearchPanel;
