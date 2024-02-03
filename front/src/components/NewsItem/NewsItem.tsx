import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { API_URL } from '../../constantas.ts';
import noImage from '../../assets/NoImage.png';
import { useNavigate } from 'react-router-dom';
import { INews } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { getCurrentNewsId } from '../../store/comment/commentSlice.ts';
import { deleteNews, getNews, getOneNews } from '../../store/news/newsThunks.ts';
import { getComments } from '../../store/comment/commentThunks.ts';
import FormatDate from '../UI/FormatDate/FormatDate.ts';

const MemoNewsItem: React.FC<INews> = React.memo(function News({id, title, image, date}) {
  const imagePath = image ? API_URL + '/' + image : noImage;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dateNews = new FormatDate(date);

  const handleDelete = async () => {
    await dispatch(deleteNews(id));
    await dispatch(getNews());
  };

  const handleNavigate = async () => {
    dispatch(getCurrentNewsId(id));
    await dispatch(getComments());
    await dispatch(getOneNews(id));
    navigate(`/news/${id}`);
  };

  return (
    <Grid item container>
      <Grid item>
        <img
          src={imagePath}
          alt={title}
        />
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item container>
          <Grid item>
            <Typography variant="body1">{dateNews.getFormatDate()}</Typography>
          </Grid>
          <Button onClick={handleNavigate}>Read Full Post</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default MemoNewsItem;