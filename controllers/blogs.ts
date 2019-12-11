import express from 'express'
import { Blog } from '../models/blog'

export async function getBlogs(req: express.Request, res: express.Response) {
  try {
    const blogs = await Blog.find()

    blogs.length
      ? res.status(200).json(blogs)
      : res.status(404).json({ message: 'There are not blogs' })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export async function getBlog(req: express.Request, res: express.Response) {
  try {
    const blog = Blog.findById(req.params!.blog_id)

    blog
      ? res.status(200).json(blog)
      : res.status(404).json({ message: 'Blog not found' })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}
