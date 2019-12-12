import { Blog } from '../../models/blog';
import { ApiResponse } from '../services/api-response';
import * as BlogsService from '../services/blogs';
import { Comment } from '../../models/comment';
import { Comment as CommentForm } from '../../middleware/validations';

export async function getComments(blogId: string): Promise<ApiResponse> {
  try {
    const searchedBlog = await BlogsService.getBlog(blogId);
    if (searchedBlog.status !== 200) {
      return searchedBlog;
    }

    const commentsIds = await Blog.findById(blogId).select('comments');
    if (!commentsIds) throw 'No comments';

    const comments = commentsIds.get('comments') as string[];
    const commentsArray = await Comment.find({ _id: { $in: comments } }).sort({ createdAt: -1 });

    return commentsArray.length
      ? { status: 200, response: { result: commentsArray } }
      : { status: 404, response: { message: 'The blog does not have comments' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot retrieve comments list' } };
  }
}

export async function getComment(blogId: string, commentId: string): Promise<ApiResponse> {
  try {
    const searchedBlog = await BlogsService.getBlog(blogId);
    if (searchedBlog.status !== 200) {
      return searchedBlog;
    }

    const searchedComments = await getComments(blogId);
    if (searchedComments.status !== 200) {
      return searchedComments;
    }

    const commentsIds = await Blog.findById(blogId).select('comments');
    if (!commentsIds) throw 'No comments';

    const comments = commentsIds.get('comments') as string[];
    if (!comments.includes(commentId)) {
      return { status: 404, response: { message: 'Comment not found' } };
    }

    const comment = await Comment.findById(commentId);

    return comment
      ? { status: 200, response: { result: comment } }
      : { status: 404, response: { message: 'Comment not found' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot retrieve comment' } };
  }
}

export async function postComment(blogId: string, comment: CommentForm): Promise<ApiResponse> {
  try {
    const searchedBlog = await BlogsService.getBlog(blogId);
    if (searchedBlog.status !== 200) {
      return searchedBlog;
    }

    const createdComment = await new Comment(comment).save();

    const commentsIds = await Blog.findById(blogId).select('comments');
    if (!commentsIds) throw 'No comments';

    const comments = commentsIds.get('comments') as string[];
    comments.push(createdComment._id);

    await Blog.findByIdAndUpdate(blogId, {
      $set: { comments: comments, modifiedAt: Date.now() }
    });

    return { status: 201, response: { result: createdComment } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot post comment' } };
  }
}

export async function putComment(blogId: string, commentId: string, comment: CommentForm): Promise<ApiResponse> {
  try {
    const searchedComment = await getComment(blogId, commentId);
    if (searchedComment.status !== 200) {
      return searchedComment;
    }

    const commentsIds = await Blog.findById(blogId).select('comments');
    if (!commentsIds) throw 'No comments';

    const comments = commentsIds.get('comments') as string[];

    if (!comments.includes(commentId)) {
      return { status: 404, response: { message: 'Comment not found' } };
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content: comment.content, modifiedAt: Date.now() } },
      { new: true }
    );

    if (!updatedComment) throw 'No comment updated';

    return { status: 200, response: { result: updatedComment } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot put comment' } };
  }
}

export async function deleteComment(blogId: string, commentId: string): Promise<ApiResponse> {
  try {
    const searchedComment = await getComment(blogId, commentId);
    if (searchedComment.status !== 200) {
      return searchedComment;
    }

    const commentsIds = await Blog.findById(blogId).select('comments');
    if (!commentsIds) throw 'No comments';

    const comments = commentsIds.get('comments') as string[];

    if (!comments.includes(commentId)) {
      return { status: 404, response: { message: 'Comment not found' } };
    }

    await Comment.findByIdAndDelete(commentId);

    await Blog.findByIdAndUpdate(blogId, {
      $set: { comments: comments.filter(comment => comment !== commentId), modifiedAt: Date.now() }
    });
    return { status: 204, response: { message: 'Comment deleted' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot delete comment' } };
  }
}
