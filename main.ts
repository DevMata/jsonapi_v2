import express from 'express'
import { valContentType } from './middleware/validations'

import { blogs } from './routes/blogs'
import { comments } from './routes/comments'

const app = express()

app.use(express.json())

app.use(valContentType)

app.use('/blogs', blogs)
app.use('/blogs/[0-9]+/comments', comments)

app.listen(3000, () => console.log('Listenting on port 3000'))
