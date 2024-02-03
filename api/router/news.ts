import { Router } from 'express';
import connectionDb from '../mySqlConfig';
import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {imagesUpload} from '../multer';
import {NewsPost} from '../types';

const newsRouter = Router();

const queryGetAll = 'SELECT id, title, image, date FROM news';
const querySelectById = 'SELECT * FROM news WHERE id = ?';
const queryPost = 'INSERT INTO news (title, content, image) VALUES (?, ?, ?)';
const queryDelete = 'DELETE FROM news WHERE id = ?';

newsRouter.get('/', async (req, res, next) => {
  try {
    const [result] = await connectionDb.getConnection().query(queryGetAll);

    res.send(result);
  } catch (e) {
    next(e)
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    if (!parseInt(req.params.id)) {
      return res.status(400).send({error: 'invalid id'});
    }

    const [result] = await connectionDb.getConnection().query(querySelectById, [req.params.id]) as RowDataPacket[];

    if (!result[0]) {
      return res.status(404).send({error: 'Not found'});
    }

    res.send(result[0]);
  } catch (e) {
    next(e)
  }
});

newsRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
  try {
    const postData: NewsPost = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? `images/${req.file.filename}` : null
    }

    if (postData.title && postData.content) {
      const [result] = await connectionDb.getConnection().query(queryPost, [postData.title, postData.content, postData.image]) as ResultSetHeader[];

      res.status(201).send({
        id: result.insertId,
        ...postData
      });
    } else {
      res.status(400).send('The title, content must be in the request')
    }
  } catch (e) {
    next(e)
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
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

export default newsRouter;