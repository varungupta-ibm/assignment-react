import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { storeUserDetails } = userSlice.actions
export default userSlice.reducer