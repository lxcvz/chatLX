import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chatName: '',
        chatId: '',
        authorId: ''
    },
    reducers: {
        activeChat(state, { payload }) {
            state.chatName = payload.chatName
            state.chatId = payload.chatId
            state.authorId = payload.authorId
        }
    },
});

export const { activeChat } = chatSlice.actions;

export default chatSlice.reducer;
