import express from 'express';
import { requireJson, validateCommentId, validateCommentBody } from '../middleware/validations';
import * as CommentsService from '../services/comments';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const comments = await CommentsService.getComments(req.params.blog_id);

  res
    .status(comments.status)
    .contentType('application/json')
    .json(comments.response);
});

router.get('/:comment_id', validateCommentId, async (req, res) => {
  const comment = await CommentsService.getComment(req.params.blog_id, req.params.comment_id);

  res
    .status(comment.status)
    .contentType('application/json')
    .json(comment.response);
});

router.post('/', requireJson, validateCommentBody, async (req, res) => {
  const createdComment = await CommentsService.postComment(req.params.blog_id, req.body);

  res
    .status(createdComment.status)
    .contentType('application/json')
    .json(createdComment.response);
});

router.put('/:comment_id', validateCommentId, requireJson, validateCommentBody, async (req, res) => {
  const updatedComment = await CommentsService.putComment(req.params.blog_id, req.params.comment_id, req.body);

  res
    .status(updatedComment.status)
    .contentType('application/json')
    .json(updatedComment.response);
});

router.delete('/:comment_id', validateCommentId, async (req, res) => {
  const deletedComment = await CommentsService.deleteComment(req.params.blog_id, req.params.comment_id);

  res
    .status(deletedComment.status)
    .contentType('application/json')
    .json(deletedComment.response);
});

export { router as comments };
