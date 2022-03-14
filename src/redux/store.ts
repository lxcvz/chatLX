import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    userAuth: persistedReducer,
    chats: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// export const store = configureStore({
//   reducer: {
//     userAuth: authReducer,
//     chats: chatReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>
