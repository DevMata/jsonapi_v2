import express from 'express';
import { requireJson, validateBlogId, validateBlogBody } from '../middleware/validations';
import * as BlogsService from '../services/blogs';
import { comments } from './comments';
import { validateTagId } from '../middleware/tags';

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

router.get('/:blog_id/tags', validateBlogId, async (req: express.Request, res: express.Response) => {
  const tags = await BlogsService.getTagsBlog(req.params.blog_id);

  res
    .status(tags.status)
    .contentType('application/json')
    .json(tags.response);
});

router.put(
  '/:blog_id/tags/:tag_id',
  validateBlogId,
  validateTagId,
  async (req: express.Request, res: express.Response) => {
    const addedTag = await BlogsService.addTagToBlog(req.params.blog_id, req.params.tag_id);

    res
      .status(addedTag.status)
      .contentType('application/json')
      .json(addedTag.response);
  }
);

router.delete(
  '/:blog_id/tags/:tag_id',
  validateBlogId,
  validateTagId,
  async (req: express.Request, res: express.Response) => {
    const removedTag = await BlogsService.removeTagFromBlog(req.params.blog_id, req.params.tag_id);

    res
      .status(removedTag.status)
      .contentType('application/json')
      .json(removedTag.response);
  }
);

router.use('/:blog_id/comments', validateBlogId, comments);

export { router as blogs };
