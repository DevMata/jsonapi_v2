import express from 'express'
const router = express.Router()
router.use(express.json())

router.get('/', (req, res) => {
  console.log('blogs router')
  res.end()
})

router.get('/:blog_id', (req, res) => {
  console.log(req.params.blog_id)
  res.end()
})

export { router as blogs }
