import { Blog } from '../../models/blog';
import { ApiResponse } from './api-response';
import { Blog as BlogForm } from '../../middleware/validations';

export async function getBlogs(): Promise<ApiResponse> {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('_id title content createdAt modifiedAt');

    return blogs.length
      ? { status: 200, response: { result: blogs } }
      : { status: 404, response: { message: 'There are not blogs' } };
  } catch (error) {
    return {
      status: 421,
      response: { message: 'Cannot get blogs from database' }
    };
  }
}

export async function getBlog(id: string): Promise<ApiResponse> {
  try {
    const blog = await Blog.findById(id).select('_id title content createdAt modifiedAt');

    return blog
      ? { status: 200, response: { result: blog } }
      : { status: 404, response: { message: 'Blog not found' } };
  } catch (error) {
    return {
      status: 421,
      response: { message: 'Cannot search the blog' }
    };
  }
}

export async function deleteBlog(id: string): Promise<ApiResponse> {
  try {
    //blog must exist
    const blog = await getBlog(id);
    if (blog.status !== 200) {
      return blog;
    }

    await Blog.findByIdAndDelete(id);

    return {
      status: 204,
      response: {
        message: 'Blog deleted'
      }
    };
  } catch (error) {
    return { status: 400, response: { message: 'Cannot delete blog' } };
  }
}

export async function postBlog(blog: BlogForm): Promise<ApiResponse> {
  try {
    const newBlog = new Blog(blog);
    const createdBlog = await newBlog.save();

    return {
      status: 201,
      response: {
        result: createdBlog
      }
    };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot post blog' } };
  }
}
