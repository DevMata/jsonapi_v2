import { Blog } from '../../models/blog';
import { ApiResponse } from '../../controllers/api-response';

export async function getBlogs(): Promise<ApiResponse> {
  try {
    const blogs = await Blog.find();

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
    const blog = await Blog.findById(id);

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
