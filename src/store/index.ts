import { configureStore } from '@reduxjs/toolkit'

import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer:{
    posts: postsReducer,
    users: usersReducer
  },
  devTools: true
})

export type rootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


