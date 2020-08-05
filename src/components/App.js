import React from 'react';
import {data} from '../data';
import {addMovies, showFavourites} from '../actions'
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { connect } from '../index';

class App extends React.Component {

  componentDidMount(){

    //make an API call
    //dispatch action
    this.props.dispatch(addMovies(data));

  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(showFavourites(val));
  }

  render(){
    const { movies, search } = this.props;
    const {list, favourites, showFavourites} = movies; // state: {movies: {list: [], favourites:[]}, search:{ result:{}}}
    console.log('RENDER');

    const displayMovies = showFavourites?favourites : list;
    return ( 
      <div className="App">
        <Navbar dispatch={this.props.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs' }`} onClick={() => this.onChangeTab(false)} >Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : '' }`} onClick={() => this.onChangeTab(true)} >Favourites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie,index) => { /* the index provided internally by the map function */
                return <MovieCard 
                          movie={movie} 
                          key={`movies-${index}`} 
                          dispatch={this.props.dispatch} 
                          isFavourite={this.isMovieFavourite(movie)}  
                        />
            })}
          </div>
          {displayMovies.length === 0 ? <div className='no-movies'>No Movies To Display!</div>: null}
        </div>
      </div>
    );
  }
  
}

// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <storeContext.Consumer>
//         {(store) => <App store={store}/>}
//       </storeContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
