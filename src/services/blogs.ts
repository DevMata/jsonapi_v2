import { Blog } from '../../models/blog'

async function getBlogs() {
  try {
    const blogs = await Blog.find()

    return blogs.length
      ? { status: 200, result: blogs }
      : { status: 404, message: 'There are not blogs' }
  } catch (error) {
    return {
      status: 421,
      message: 'Cannot get blogs from database'
    }
  }
}

async function getBlog(id: string) {
  try {
    const blog = await Blog.findById(id)

    return blog
      ? { status: 200, result: blog }
      : { status: 404, message: 'Blog not found' }
  } catch (error) {
    return {
      status: 421,
      message: 'Cannot search the blog'
    }
  }
}
