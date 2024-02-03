import {Button, Grid, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {getComments, postComments} from "../../store/comment/commentThunks.ts";
import {ICommentPost} from "../../types";

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setComment(prevState => (
      {
        ...prevState,
        [name]: value
      }
    ))
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const postData: ICommentPost = {
      author: comment.author? comment.author : null,
      content: comment.content,
    }
    await dispatch(postComments(postData));
    await dispatch(getComments());
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid container item>
        <Grid item>
          <TextField
            label='Name'
            name='author'
            onChange={onChange}
            value={comment.author}
          />
        </Grid>
        <Grid item>
          <TextField
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
          <Button type='submit'>Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;