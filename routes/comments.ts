import express from 'express';
import { requireJson, validateCommentId } from '../middleware/validations';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  console.log('reached');
  console.log(req.params.blog_id);
  res.end();
});

router.get('/:comment_id', validateCommentId, (req, res) => {
  res
    .status(200)
    .contentType('application/json')
    .json(req.params);
});

router.post('/', requireJson, (req, res) => {
  res.end();
});

// router.put('/:comment_id', requireJson, (req, res) => {
//   res.end();
// });

// router.delete('/:comment_id', (req, res) => {
//   res.end();
// });

export { router as comments };
