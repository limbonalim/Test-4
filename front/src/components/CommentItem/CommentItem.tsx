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
    <Grid item container>
      <Grid item>
        <Typography>{author ? author : 'Anonimus'}</Typography>
        <Typography>{content}</Typography>
      </Grid>
      <Grid item><Button onClick={handleDelete}>Delete</Button></Grid>
    </Grid>
  );
};

export default CommentItem;