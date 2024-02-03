import {Button, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectNews} from "../../store/news/newsSlice.ts";
import {useEffect} from "react";
import {getNews} from "../../store/news/newsThunks.ts";
import MemoNewsItem from "../../components/NewsItem/NewsItem.tsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch()
  const news = useAppSelector(selectNews);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());
  }, []);

  const onClick = () => {
    navigate('/news/new');
  };

  return (
    <Grid container>
      <Grid item container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h2'>Posts:</Typography>
        </Grid>
        <Grid item>
          <Button onClick={onClick}>Add new post</Button>
        </Grid>
        <Grid item container spacing={2}>
          {news.map(({id, title, image, date}) => (
            <MemoNewsItem
              key={id}
              id={id}
              title={title}
              image={image}
              date={date}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;