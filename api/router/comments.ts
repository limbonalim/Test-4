import { Router } from 'express';

const commentsRouter = Router();


commentsRouter.get('/', (req, res) => {
  console.log(req.query.news_id)
  res.send('1')
});

commentsRouter.post('/', (req, res) => {

});

commentsRouter.delete('/:id', (req, res) => {

});

export default commentsRouter;