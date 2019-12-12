import express from 'express';
import { requireJson, requireMongoId, validateBlogBody } from '../middleware/validations';
import * as blogsController from '../controllers/blogs';

const router = express.Router();
router.use(express.json());

router.get('/', blogsController.getBlogs);

router.get('/:blog_id', requireMongoId, blogsController.getBlog);

router.post('/', requireJson, blogsController.postBlog);

router.put('/:blog_id', requireMongoId, requireJson);

router.delete('/:blog_id', requireMongoId);

export { router as blogs };
