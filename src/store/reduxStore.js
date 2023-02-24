import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './redux slices/movie' // Can be named anything because it is the default export

const store = configureStore({
    reducer: {
        movie: movieReducer,
    }
})

export default store