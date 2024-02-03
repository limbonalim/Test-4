import { Router } from 'express';
import connectionDb from '../mySqlConfig';
import {RowDataPacket} from 'mysql2';
import {ResultSetHeader} from 'mysql2/';

const commentsRouter = Router();

const queryGetCommentForNews = 'SELECT * FROM comments WHERE news_id = ?';
const queryPost = 'INSERT INTO comments (news_id, author, content) VALUES (?, ?, ?)';
const querySelectById = 'SELECT * FROM comments WHERE id = ?';
const queryDelete = 'DELETE FROM comments WHERE id = ?';

commentsRouter.get('/', async (req, res, next) => {
  // console.log(req.query.news_id)
  try {
    if (!parseInt(req.query.news_id as string)) {
      return res.status(400).send({error: 'invalid news id'});
    }

    const [result] = await connectionDb.getConnection().query(queryGetCommentForNews, [req.query.news_id]) as RowDataPacket[];

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    res.send(result);
  } catch (e) {
    next(e)
  }
});

commentsRouter.post('/', async (req, res, next) => {
  try {
    const postData = {
      newsId: parseInt(req.body.newsId),
      author: req.body.author? req.body.author : null,
      content: req.body.content
    };

    if (!postData.newsId || !postData.content) {
      return res.status(400).send('The news and content must be in the request');
    }

    const [result] = await connectionDb.getConnection().query(queryPost, [postData.newsId, postData.author, postData.content]) as ResultSetHeader[];

    res.status(201).send({
      id: result.insertId,
      ...postData
    });
  } catch (e) {
    next(e)
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }

    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    const [_] = await connectionDb.getConnection().query(queryDelete, [req.params.id]) as ResultSetHeader[];
    res.status(200).send(`ID: ${req.params.id} was been deleted`);
  } catch (e) {
    next(e)
  }
});

export default commentsRouter;