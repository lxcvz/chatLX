import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "userAuth",
    initialState: {
        userName: '',
        userEmail: '',
        userUid: ''
    },
    reducers: {
        activeUser(state, { payload }) {
            state.userName = payload.userName
            state.userEmail = payload.userEmail
            state.userUid = payload.userUid
        }
    },
});

export const { activeUser } = authSlice.actions;

export default authSlice.reducer;
