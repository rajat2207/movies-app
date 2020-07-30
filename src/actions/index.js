//action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';

//action creators
export function addMovies(movies){
    return {
        type: ADD_MOVIES,
        movies
    }
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