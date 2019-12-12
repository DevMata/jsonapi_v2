import express from 'express';
import { requireJson } from '../middleware/validations';

const router = express.Router();

router.get('/', (req, res) => {
  res.end();
});

router.get('/:comment_id', (req, res) => {
  res.end();
});

router.post('/', requireJson, (req, res) => {
  res.end();
});

router.put('/:comment_id', requireJson, (req, res) => {
  res.end();
});

router.delete('/:comment_id', (req, res) => {
  res.end();
});

export { router as comments };
