import React from 'react';
import { connect } from 'react-redux';
// import { data } from '../data';
import { addMovieToList,handleMovieSearch } from '../actions';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchText:''
    }
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults: false
    });
  } 

  handleChange =(event) => {
    this.setState({
      searchText : event.target.value
    })
  }

  handleSearch = () => {
    const { searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText));
  }

  render () {

    const {result:movie,showSearchResults} = this.props.search;
    return (
        <div className="nav">
          <div className="search-container">
            <input onChange={this.handleChange} />
            <button id="search-btn" onClick={this.handleSearch}>Search</button>

            {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
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

// class NavbarWrapper extends React.Component{
//   render(){
//     return(
//     <storeContext.Consumer>
//       {(store) => <Navbar dispatch={store.dispatch} search={this.props.search} /> }
//     </storeContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

const connectedNavbarComponent = connect(mapStateToProps)(Navbar);

export default connectedNavbarComponent;
