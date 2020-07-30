import {ADD_MOVIES, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, SET_SHOW_FAVOURITES} from '../actions/index';

const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites: false
}

export default function movies (state=initialMoviesState,action) {
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state, //using spread operator(...)
    //         list: action.movies
    //     };
    // }

    // return state;


    switch (action.type){
        case ADD_MOVIES:
            return {
                ...state, //using spread operator(...)
                list: action.movies
            };
        case ADD_TO_FAVOURITES:
            return{
                ...state, //using spread operator(...)
                favourites: [action.movie, ...state.favourites] //adding the new movie in first place and then adding the other old movies using spread operator
            }
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourites.filter(
                movie => movie.title !== action.movie.title
            )

            return {
                ...state,
                favourites:filteredArray
            }
        case SET_SHOW_FAVOURITES:

            return{
                ...state,
                showFavourites : action.val
            }
        default:
            return state;
    }
}