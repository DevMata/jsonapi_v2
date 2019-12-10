import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  console.log('comments router')
  res.end()
})

export { router as comments }
