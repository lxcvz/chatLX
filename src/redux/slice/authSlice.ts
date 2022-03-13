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
        },
        userLogOut: state => {
            state.userName = ''
            state.userEmail = ''
            state.userUid = ''
        }
    },
});

// Action creators are generated for each case reducer function
export const { activeUser, userLogOut } = authSlice.actions;

export default authSlice.reducer;
