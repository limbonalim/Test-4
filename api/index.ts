import express, { json } from 'express';
import cors from 'cors';
import newsRouter from './router/news';
import commentsRouter from './router/comments';
import connectionDb from './mySqlConfig';

const app = express();
const port = 8000;

app.use(json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await connectionDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}

void run();