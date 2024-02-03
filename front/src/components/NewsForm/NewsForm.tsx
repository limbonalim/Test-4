import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from '../UI/FileInput/FileInput.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { getNews, postNews } from '../../store/news/newsThunks.ts';
import { useNavigate } from 'react-router-dom';

export interface IFormNews {
  title: string;
  content: string;
  image: File | null;
}

const NewsForm = () => {
  const [news, setNews] = useState<IFormNews>({
    title: '',
    content: '',
    image: null,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNews(prev => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postNews(news));
    await dispatch(getNews());
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container item direction="column" spacing={2}>
        <Grid item>
          <TextField
            sx={{
              width: '50%'
            }}
            label="Title"
            name="title"
            onChange={onChange}
            value={news.title}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{
              width: '50%'
            }}
            onChange={onChange}
            value={news.content}
            multiline
            rows={3}
            name="content"
            label="Comment"
            required
          />
        </Grid>
        <Grid item>
          <FileInput
            name="image"
            onChange={onChangeFileInput}
            label="Imeage"
          />
        </Grid>
        <Grid item>
          <Button type="submit">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewsForm;