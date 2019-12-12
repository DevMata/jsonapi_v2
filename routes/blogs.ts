import express from 'express';
import { requireJson, validateBlogId, validateBlogBody } from '../middleware/validations';
import * as blogsService from '../src/services/blogs';
import { comments } from './comments';

const router = express.Router();
router.use(express.json());

router.get('/', async (req: express.Request, res: express.Response) => {
  const blogs = await blogsService.getBlogs();

  res
    .status(blogs.status)
    .contentType('applicaction/json')
    .json(blogs.response);
});

router.get('/:blog_id', validateBlogId, async (req: express.Request, res: express.Response) => {
  const blog = await blogsService.getBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

router.post('/', requireJson, validateBlogBody, async (req: express.Request, res: express.Response) => {
  const blog = await blogsService.postBlog(req.body);

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
    const blog = await blogsService.putBlog(req.params.blog_id, req.body);

    res
      .status(blog.status)
      .contentType('application/json')
      .json(blog.response);
  }
);

router.delete('/:blog_id', validateBlogId, async (req: express.Request, res: express.Response) => {
  const blog = await blogsService.deleteBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

router.use('/:blog_id/comments', validateBlogId, comments);

export { router as blogs };
