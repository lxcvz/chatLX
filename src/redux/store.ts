import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";

export const store = configureStore({
  reducer: {
    userAuth: authReducer,
    chats: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
