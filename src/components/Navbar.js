import React from 'react';
import { data } from '../data';
import { addMovieToList } from '../actions';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showSearchResults: true,
      searchText:''
    }
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults: false
    });
  } 

  handleSearch = () => {
    // 
  }

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
                <img src={data[2].Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{data[2].Title}</span>
                  <button onClick={() => this.handleAddToMovies(data[2])}>
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
