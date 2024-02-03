import { Button, Grid, Typography } from '@mui/material';
import { IComment } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { deleteComment, getComments } from '../../store/comment/commentThunks.ts';

const CommentItem: React.FC<IComment> = ({id, content, author}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await dispatch(deleteComment(id));
    await dispatch(getComments());
  };

  return (
    <Grid item container sx={{border: '1px solid black', borderRadius: 5, padding: 1, marginTop: 1}}>
      <Grid item container spacing={1}>
        <Grid item>
          <Typography>{author ? author : 'Anonimus'}:</Typography>
        </Grid>
        <Grid item>
          <Typography>{content}</Typography>
        </Grid>
      </Grid>
      <Grid item><Button onClick={handleDelete} color='error'>Delete</Button></Grid>
    </Grid>
  );
};

export default CommentItem;