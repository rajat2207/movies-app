import {ADD_MOVIES, ADD_FAVOURITE} from '../actions/index';

const initialMoviesState = {
    list: [],
    favourites: []
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
        case ADD_FAVOURITE:
            return{
                ...state, //using spread operator(...)
                favourites: [action.movie, ...state.favourites] //adding the new movie in first place and then adding the other old movies using spread operator
            }
        default:
            return state;
    }
}