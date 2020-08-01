//action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';

//action creators
export function addMovies(movies){
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addMovieToList(movie) {
    return {
      type: ADD_MOVIE_TO_LIST,
      movie
    };
  }
  

export function addFavourite(movie){
    return {
        type: ADD_TO_FAVOURITES,
        movie
    }
}

export function removeFavourite(movie){
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie
    }
}

export function showFavourites(val){
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function handleMovieSearch(movie){
    const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`

    return function(dispatch){
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log(movie)
            
            //dispatch an action
            dispatch(addMovieSearchResult(movie));
            })
    }
    //problem- the action should return an object which will be passed to the middleware whereas here we are returning a function,hence we need to tell redux that if it is an object pass it to the reducer and else if it is a function, execute the function, therefore we use a middleware thunk, if a function is returned it calls the function else passes the object to the reducer 
}


export function addMovieSearchResult(movie){
    return {
        type: ADD_SEARCH_RESULT, 
        movie
    }
}