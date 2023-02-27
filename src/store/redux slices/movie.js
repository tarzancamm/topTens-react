import {createSlice} from "@reduxjs/toolkit";

let initialMovieState = {
  movies: [],
  page: 1,
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialMovieState,
  reducers: {
    popular(state, action) {
        state.movies = action.payload
    },
    topRated(state, action) {
        state.movies = action.payload
    },
    nowPlaying(state, action) {
        state.movies = action.payload
    },
    page(state, action) {
        state.page = action.payload
    },
  },
});

export const movieActions = movieSlice.actions; // Imported by components
export default movieSlice.reducer; // Imported by reduxStore.js
