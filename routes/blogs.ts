import express from 'express'
import { requireJson } from '../middleware/validations'

const router = express.Router()
router.use(express.json())

router.get('/', (req, res) => {
  res.end()
})

router.get('/:blog_id', (req, res) => {
  res.end()
})

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
