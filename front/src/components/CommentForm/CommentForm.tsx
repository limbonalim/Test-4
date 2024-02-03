import { Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getComments, postComments } from '../../store/comment/commentThunks.ts';
import { ICommentPost } from '../../types';
import { selectCurrentNews } from '../../store/comment/commentSlice.ts';

interface ICommentForm {
  author: string;
  content: string;
}

const CommentForm = () => {
  const [comment, setComment] = useState<ICommentForm>({
    author: '',
    content: ''
  });
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectCurrentNews)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setComment(prevState => (
      {
        ...prevState,
        [name]: value
      }
    ));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (news) {
      const postData: ICommentPost = {
        author: comment.author ? comment.author : null,
        content: comment.content,
        newsId: news.id
      };
      await dispatch(postComments(postData));
      await dispatch(getComments());
    }

  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container item direction='column' spacing={2}>
        <Grid item> <Typography variant="h4">Add Comments:</Typography></Grid>
        <Grid item>
          <TextField
            sx={{width: '50%'}}
            label="Name"
            name="author"
            onChange={onChange}
            value={comment.author}
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{width: '70%'}}
            onChange={onChange}
            value={comment.content}
            multiline
            rows={3}
            name="content"
            label="Comment"
            required
          />
        </Grid>
        <Grid item>
          <Button type="submit">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;