import express from 'express'
import { requireJson, requireMongoId } from '../middleware/validations'
import * as blogsController from '../controllers/blogs'

const router = express.Router()
router.use(express.json())

router.get('/', blogsController.getBlogs)

router.get('/:blog_id', requireMongoId, blogsController.getBlog)

router.post('/', requireJson, (req, res) => {
  res.end()
})

router.put('/:blog_id', requireJson, (req, res) => {
  res.end()
})

router.delete('/:blog_id', (req, res) => {
  res.end()
})

export { router as blogs }
