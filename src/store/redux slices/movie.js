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
    trending(state, action) {
        state.movies = action.payload
    },
    pageUp(state) {
        state.page = state.page += 1
    },
    pageDown(state) {
        state.page = state.page -= 1
    }
  },
});

export const movieActions = movieSlice.actions; // Imported by components
export default movieSlice.reducer; // Imported by reduxStore.js
