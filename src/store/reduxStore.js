import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './redux slices/movie' // Can be named anything because it is the default export
import profileReducer from './redux slices/profile'

const store = configureStore({
    reducer: {
        movie: movieReducer,
        profile: profileReducer,
    }
})

export default store