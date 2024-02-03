import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getComments} from "./commentThunks.ts";
import {IComment} from "../../types";



interface ICommentSlice {
  comments: IComment[];
  currentNewsId: number | null;
  isLoading: boolean
}

const initialState: ICommentSlice = {
  comments: [],
  currentNewsId: null,
  isLoading: false
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getCurrentNewsId: (state, {payload: id}) => {
      state.currentNewsId = id;
    },
    clearCurrentNewsId: (state) => {
      state.currentNewsId = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    }).addCase(getComments.fulfilled, (state, {payload: comments}) => {
      state.comments = comments;
      state.isLoading = false;
    }).addCase(getComments.rejected, (state) => {
      state.isLoading = false;
    });
  }

});

export const selectComments = (state: RootState) => state.comment.comments;
export const selectCurrentNews = (state: RootState) => state.news.currentNews;

export const commentsRouter = commentSlice.reducer;

export const {getCurrentNewsId, clearCurrentNewsId} = commentSlice.actions;
