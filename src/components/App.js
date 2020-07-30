import React from 'react';
import {data} from '../data';
import {addMovies, showFavourites} from '../actions'
import Navbar from './Navbar';
import MovieCard from './MovieCard';

class App extends React.Component {

  componentDidMount(){
    const {store} = this.props;

    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();
    })

    //make an API call
    //dispatch action
    store.dispatch(addMovies(data));

    console.log('state', store.getState());
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(showFavourites(val));
  }

  render(){
    const {movies} = this.props.store.getState()
    const {list, favourites, showFavourites} = movies; // state: {movies: {list: [], favourites:[]}, search:{ result:{}}}
    console.log('RENDER');

    const displayMovies = showFavourites?favourites : list;
    return ( 
      <div className="App">
        <Navbar/>
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
                          store={this.props.store} 
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

export default App;
