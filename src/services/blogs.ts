import { Blog } from '../models/blog';
import { ApiResponse } from './api-response';
import { Blog as BlogForm } from '../middleware/validations';
import { Comment } from '../models/comment';
import { Tag } from '../models/tag';
import * as TagsServices from './tags';

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

export async function getTagsBlog(id: string): Promise<ApiResponse> {
  try {
    const blog = await getBlog(id);
    if (blog.status !== 200) {
      return blog;
    }

    const tagsIds = await Blog.findById(id).select('tags');
    if (!tagsIds) throw 'No tags';

    const tags = tagsIds.get('tags') as string[];
    const tagsArray = await Tag.find({ _id: { $in: tags } }).sort({ createdAt: -1 });

    return tagsArray.length
      ? { status: 200, response: { result: tagsArray } }
      : { status: 404, response: { message: 'The blog does not have tags' } };
  } catch (error) {
    return {
      status: 421,
      response: { message: 'Cannot retrieve tags list' }
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

    const comments = await Blog.findById(id).select('comments');
    if (!comments) throw 'No comments';

    const commentsIds = comments.get('comments') as string[];

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ _id: { $in: commentsIds } });

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

export async function removeTagFromBlog(blogId: string, tagId: string): Promise<ApiResponse> {
  try {
    const blog = await getBlog(blogId);
    if (blog.status !== 200) {
      return blog;
    }

    const searchedTag = await TagsServices.getTag(tagId);
    if (searchedTag.status !== 200) {
      return searchedTag;
    }

    const tagsIds = await Blog.findById(blogId).select('tags');
    if (!tagsIds) throw 'No tags';

    const tags = tagsIds.get('tags') as string[];
    if (!tags.includes(tagId)) {
      return { status: 404, response: { message: 'Blog does not have this tag' } };
    }

    await Blog.findByIdAndUpdate(blogId, {
      $set: { tags: tags.filter(tag => tag !== tagId), modifiedAt: Date.now() }
    });

    return { status: 200, response: { message: 'Tag removed from blog' } };
  } catch (error) {
    return { status: 400, response: { message: 'Cannot remove tag from blog' } };
  }
}

export async function postBlog(blog: BlogForm): Promise<ApiResponse> {
  try {
    const createdBlog = await new Blog(blog).save();
    const res = await Blog.findById(createdBlog._id).select('_id title content createdAt modifiedAt');

    if (!res) throw 'No created blog';

    return {
      status: 201,
      response: {
        result: res
      }
    };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot post blog' } };
  }
}

export async function putBlog(id: string, blog: BlogForm): Promise<ApiResponse> {
  try {
    const existingBlog = await getBlog(id);
    if (existingBlog.status !== 200) {
      return existingBlog;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title: blog.title, content: blog.content, modifiedAt: Date.now() } },
      { new: true }
    ).select('_id title content createdAt modifiedAt');

    if (!updatedBlog) throw 'No updated blog';

    return { status: 200, response: { result: updatedBlog } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot put blog' } };
  }
}

export async function addTagToBlog(blogId: string, tagId: string): Promise<ApiResponse> {
  try {
    const blog = await getBlog(blogId);
    if (blog.status !== 200) {
      return blog;
    }

    const searchedTag = await TagsServices.getTag(tagId);
    if (searchedTag.status !== 200) {
      return searchedTag;
    }

    const tagsIds = await Blog.findById(blogId).select('tags');
    if (!tagsIds) throw 'No tags';

    const tags = tagsIds.get('tags') as string[];
    if (tags.includes(tagId)) {
      return { status: 405, response: { message: 'Blog already has this tag' } };
    }

    tags.push(tagId);

    await Blog.findByIdAndUpdate(blogId, {
      $set: { tags: tags, modifiedAt: Date.now() }
    });

    return { status: 200, response: { message: 'Tad added to blog' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot add tag to blog' } };
  }
}
