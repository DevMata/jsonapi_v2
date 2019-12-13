import { ApiResponse } from '../services/api-response';
import { Tag } from '../models/tag';
import { Tag as TagForm } from '../middleware/tags';

export async function getTags(): Promise<ApiResponse> {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });

    return tags.length
      ? { status: 200, response: { result: tags } }
      : { status: 404, response: { message: 'There are not tags' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot retrieve tags list' } };
  }
}

export async function getTag(tagId: string): Promise<ApiResponse> {
  try {
    const tag = await Tag.findById(tagId);

    return tag ? { status: 200, response: { result: tag } } : { status: 404, response: { message: 'Tag not found' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot retrieve tag' } };
  }
}

export async function postTag(tag: TagForm): Promise<ApiResponse> {
  try {
    const createdTag = await new Tag(tag).save();
    return { status: 201, response: { result: createdTag } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot post tag' } };
  }
}

export async function putTag(tagId: string, tag: TagForm): Promise<ApiResponse> {
  try {
    const searchedTag = await getTag(tagId);
    if (searchedTag.status !== 200) {
      return searchedTag;
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      tagId,
      { $set: { name: tag.name, modifiedAt: Date.now() } },
      { new: true }
    );

    if (!updatedTag) throw 'No tag updated';

    return { status: 200, response: { result: updatedTag } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot put tag' } };
  }
}

export async function deleteTag(tagId: string): Promise<ApiResponse> {
  try {
    const searchedTag = await getTag(tagId);
    if (searchedTag.status !== 200) {
      return searchedTag;
    }

    await Tag.findByIdAndDelete(tagId);

    return { status: 204, response: { message: 'Tag deleted' } };
  } catch (error) {
    return { status: 421, response: { message: 'Cannot delete tag' } };
  }
}
