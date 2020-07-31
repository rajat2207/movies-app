import React from 'react';
import { data } from '../data';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showSearchResults: true,
      searchText:''
    }
  }

  handleAddToMovies = () => {

  } 

  handleChange = (event) => {
    this.setState({
      searchText : event.target.value 
    })
  }

  // handleSearch = () => {
  //   const {searchText} = this.state;
  //   const {store} = this.props;

  //   store.dispatch(handleMovieSearch(searchText));
  // }

  render () {

    const {showSearchResults} =this.state;
    return (
        <div className="nav">
          <div className="search-container">
            <input onChange={this.handleChange} />
            <button id="search-btn" onClick={this.handleSearch}>Search</button>

            {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={data[0].Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{data[0].Title}</span>
                  <button onClick={this.handleAddToMovies}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
    );
  }
}

export default Navbar;
