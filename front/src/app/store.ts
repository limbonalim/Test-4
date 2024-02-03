import { configureStore } from '@reduxjs/toolkit';
import {newsReducer} from '../store/news/newsSlice.ts';
import {commentsRouter} from "../store/comment/commentSlice.ts";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comment: commentsRouter
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;