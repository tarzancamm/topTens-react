import { createSlice } from "@reduxjs/toolkit";

let initialProfileState = {
    topTenMovies: [],
    topTenDetails: []
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {
        topTen(state, action) {
            state.topTenMovies = action.payload
        },
        topDetails(state, action) {
            state.topTenDetails = [...state.topTenDetails, action.payload]
        }
    }
})

export const profileActions = profileSlice.actions // Imported by components
export default profileSlice.reducer // Imported by reduxStore.js