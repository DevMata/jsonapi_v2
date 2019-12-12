import express from 'express';
import * as BlogService from '../src/services/blogs';

export async function getBlogs(req: express.Request, res: express.Response): Promise<void> {
  const blogs = await BlogService.getBlogs();

  res
    .status(blogs.status)
    .contentType('application/json')
    .json(blogs.response);
}

export async function getBlog(req: express.Request, res: express.Response): Promise<void> {
  const blog = await BlogService.getBlog(req.params.blog_id);

  res
    .status(blog.status)
    .contentType('application/json')
    .json(blog.response);
}

export async function deleteBlog(req: express.Request, res: express.Response): Promise<void> {
  const blog = await BlogService.getBlog(req.params.blog_id);
  if (blog.status === 404) {
    res
      .status(blog.status)
      .contentType('application/json')
      .json(blog.response);
  }
}

export async function postBlog(req: express.Request, res: express.Response): Promise<void> {
  res.end();
}

export async function putBlog(req: express.Request, res: express.Response): Promise<void> {
  res.end();
}
