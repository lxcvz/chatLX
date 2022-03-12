import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "userAuth",
    initialState: {
        userName: null,
        userEmail: null,
        userUid: null
    },
    reducers: {
        activeUser(state, { payload }) {
            state.userName = payload.userName
            state.userEmail = payload.userEmail
            state.userUid = payload.userUid
        },
        userLogOut: state => {
            state.userName = null
            state.userEmail = null
            state.userUid = null
        }
    },
});

// Action creators are generated for each case reducer function
export const { activeUser, userLogOut } = authSlice.actions;

export default authSlice.reducer;
