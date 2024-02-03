import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IFullNews, INews } from '../../types';
import { IFormNews } from '../../components/NewsForm/NewsForm.tsx';

export const getNews = createAsyncThunk<INews[], void>(
  'news/fetchNews',
  async () => {
    const response = await axiosApi.get<INews[]>('/news');
    return response.data;
  }
);

export const getOneNews = createAsyncThunk<IFullNews, number>(
  'news/fetchOneNews',
  async (id) => {
    const response = await axiosApi.get<IFullNews>(`/news/${id}`);
    return response.data;
  }
);

export const postNews = createAsyncThunk<void, IFormNews>(
  'news/postNews',
  async (data) => {
    const postData = new FormData();
    postData.append('content', data.content);
    postData.append('title', data.title);
    if (data.image) {
      postData.append('image', data.image);
    }
    await axiosApi.post(`/news/`, postData);
  }
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/deleteNews',
  async (id) => {
    await axiosApi.delete(`/news/${id}`);
  }
);