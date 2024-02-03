import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentNews } from '../../store/news/newsSlice.ts';
import { API_URL } from '../../constantas.ts';
import noImage from '../../assets/NoImage.png';
import { Grid, Typography } from '@mui/material';
import CommentForm from '../../components/CommentForm/CommentForm.tsx';
import { selectComments } from '../../store/comment/commentSlice.ts';
import CommentItem from '../../components/CommentItem/CommentItem.tsx';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';
import { useEffect } from 'react';
import { getOneNews } from '../../store/news/newsThunks.ts';
import { useParams } from 'react-router-dom';
import {getComments} from "../../store/comment/commentThunks.ts";


const NewsPage = () => {
  const news = useAppSelector(selectCurrentNews);
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const {id} = useParams();


  const image = news?.image ? API_URL + '/' + news.image : noImage;

  const getNews = async () => {
    if (id) {
      await dispatch(getOneNews(parseInt(id)));
      await dispatch(getComments());
    }
  };


  useEffect(() => {
    void getNews();
  }, []);

  return news && (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          <Grid item>
            <img
              src={image}
              alt={news.title}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3">
              {news.title}
            </Typography>
            <Typography variant="body1">
              {new FormatDate(news.date).getFormatDate()}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>{news.content}</Typography>
        </Grid>
        <Grid item container>
          {comments.length ? (<Grid item> <Typography variant="h3">Comments:</Typography></Grid>) : null}
          {comments.map(({id, content, author}) => (
            <CommentItem
              key={id}
              id={id}
              content={content}
              author={author}
            />
          ))}
        </Grid>
        <Grid item>
          <CommentForm/>
        </Grid>
      </Grid>


    </>
  );
};

export default NewsPage;