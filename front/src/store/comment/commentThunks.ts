import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IComment, ICommentPost } from '../../types';
import { RootState } from '../../app/store.ts';

export const getComments = createAsyncThunk<IComment[], void, { state: RootState }>(
  'comment/fetchComments',
  async (_, thunkAPI) => {
    const id = thunkAPI.getState().news.currentNews?.id;
    if (id) {
      const res = await axiosApi.get<IComment[]>(`/comments?news_id=${id}`);
      return res.data;
    }
    return [];
  }
);

export const postComments = createAsyncThunk<void, ICommentPost>(
  'comment/postComments',
  async (data) => {
    await axiosApi.post(`/comments`, data);
  }
);

export const deleteComment = createAsyncThunk<void, number>(
  'comment/postComments',
  async (id) => {
    await axiosApi.delete(`/comments/${id}`);
  }
);