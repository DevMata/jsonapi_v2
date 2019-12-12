import express from 'express';
import { requireJson, requireMongoId, validateBlogBody } from '../middleware/validations';
import * as blogsService from '../src/services/blogs';

const router = express.Router();
router.use(express.json());

router.get('/', async (req: express.Request, res: express.Response) => {
  const blogs = await blogsService.getBlogs();

  res
    .status(blogs.status)
    .contentType('applicaction/json')
    .json(blogs.response);
});

router.get('/:blog_id', requireMongoId, async (req: express.Request, res: express.Response) => {
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

router.put('/:blog_id', requireMongoId, requireJson, async (req: express.Request, res: express.Response) => {
  res.end();
});

router.delete('/:blog_id', requireMongoId, async (req: express.Request, res: express.Response) => {
  const blog = await blogsService.deleteBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
});

export { router as blogs };
