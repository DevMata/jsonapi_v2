import express from 'express';
import { requireJson } from '../middleware/validations';
import { validateTagId, validateTagBody } from '../middleware/tags';
import * as TagsServices from '../services/tags';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const tags = await TagsServices.getTags();

  res
    .status(tags.status)
    .contentType('application/json')
    .json(tags.response);
});

router.get('/:tag_id', validateTagId, async (req, res) => {
  const tags = await TagsServices.getTag(req.params.tag_id);

  res
    .status(tags.status)
    .contentType('application/json')
    .json(tags.response);
});

router.post('/', requireJson, validateTagBody, async (req, res) => {
  const createdTag = await TagsServices.postTag(req.body);

  res
    .status(createdTag.status)
    .contentType('application/json')
    .json(createdTag.response);
});

router.put('/:tag_id', validateTagId, requireJson, validateTagBody, async (req, res) => {
  const updatedTag = await TagsServices.putTag(req.params.tag_id, req.body);

  res
    .status(updatedTag.status)
    .contentType('application/json')
    .json(updatedTag.response);
});

router.delete('/:tag_id', validateTagId, async (req, res) => {
  const deletedTag = await TagsServices.deleteTag(req.params.tag_id);

  res
    .status(deletedTag.status)
    .contentType('application/json')
    .json(deletedTag.response);
});

export { router as tags };
