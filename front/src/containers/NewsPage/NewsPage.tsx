import { useAppSelector } from '../../app/hooks.ts';
import { selectCurrentNews } from '../../store/news/newsSlice.ts';
import { API_URL } from '../../constantas.ts';
import noImage from '../../assets/NoImage.png';
import { Grid, Typography } from '@mui/material';
import CommentForm from '../../components/CommentForm/CommentForm.tsx';
import { selectComments } from '../../store/comment/commentSlice.ts';
import CommentItem from '../../components/CommentItem/CommentItem.tsx';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';


const NewsPage = () => {
  const news = useAppSelector(selectCurrentNews);
  const comments = useAppSelector(selectComments);

  const image = news?.image ? API_URL + '/' + news.image : noImage;

  return news && (
    <>
      <Grid container>
        <Grid item container>
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
          <Grid item> <Typography variant="h3">Comments:</Typography></Grid>
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