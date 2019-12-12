import express from 'express';
import { requireJson, validateBlogId, validateBlogBody } from '../middleware/validations';
import * as BlogsService from '../src/services/blogs';
import { comments } from './comments';

const router = express.Router();
router.use(express.json());

router.get('/', async (req: express.Request, res: express.Response) => {
  const blogs = await BlogsService.getBlogs();

  res
    .status(blogs.status)
    .contentType('applicaction/json')
    .json(blogs.response);
});

router.get('/:blog_id', validateBlogId, async (req: express.Request, res: express.Response) => {
  const blog = await BlogsService.getBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

router.post('/', requireJson, validateBlogBody, async (req: express.Request, res: express.Response) => {
  const blog = await BlogsService.postBlog(req.body);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

router.put(
  '/:blog_id',
  validateBlogId,
  requireJson,
  validateBlogBody,
  async (req: express.Request, res: express.Response) => {
    const blog = await BlogsService.putBlog(req.params.blog_id, req.body);

    res
      .status(blog.status)
      .contentType('application/json')
      .json(blog.response);
  }
);

router.delete('/:blog_id', validateBlogId, async (req: express.Request, res: express.Response) => {
  const blog = await BlogsService.deleteBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

router.use('/:blog_id/comments', validateBlogId, comments);

export { router as blogs };
