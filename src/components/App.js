import React from 'react';
import {data} from '../data';
import {addMovies} from '../actions'
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
    const {favourites} = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }

  render(){
    const {list}= this.props.store.getState(); // state: {list: [], favourites:[]}
    console.log('RENDER');
    return ( 
      <div className="App">
        <Navbar/>
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
            {list.map((movie,index) => { /* the index provided internally by the map function */
                return <MovieCard 
                          movie={movie} 
                          key={`movies-${index}`} 
                          store={this.props.store} 
                          isFavourite={this.isMovieFavourite(movie)}  
                        />
            })}
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
