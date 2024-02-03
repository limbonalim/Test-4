import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {getNews, getOneNews} from './newsThunks.ts';
import {IFullNews, INews} from "../../types";


interface INewsSlice {
  news: INews[];
  currentNews: IFullNews | null;
  isLoading: boolean;
  isNewsLoading: boolean;
}

const initialState: INewsSlice = {
  news: [],
  currentNews: null,
  isLoading: false,
  isNewsLoading: false
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
    }).addCase(getNews.fulfilled, (state, {payload: news}) => {
      state.news = news;
      state.isLoading = false;
    }).addCase(getNews.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getOneNews.pending, (state) => {
      state.isNewsLoading = true;
      state.currentNews = null;
    }).addCase(getOneNews.fulfilled, (state, {payload: news}) => {
      state.isNewsLoading = false;
      state.currentNews = news;
    }).addCase(getOneNews.rejected, (state) => {
      state.isNewsLoading = false;
    })
  }
});

export const selectNews = (state: RootState) => state.news.news;
export const selectCurrentNews = (state: RootState) => state.news.currentNews;

export const newsReducer = newsSlice.reducer;

export const {} = newsSlice.actions;
