import express from 'express';
import { Validator, validate, IsString, MinLength } from 'class-validator';

const validator = new Validator();

export class Comment {
  @IsString()
  @MinLength(1)
  content: string;

  constructor({ content }: { content: string }) {
    this.content = content;
  }
}

export function validateCommentId(req: express.Request, res: express.Response, next: Function): void {
  const params = req.params;

  if (!validator.isMongoId(params['comment_id'])) {
    res.status(400).json({ message: 'Invalid mongo Id for comment' });
  } else {
    next();
  }
}

export async function validateCommentBody(req: express.Request, res: express.Response, next: Function): Promise<void> {
  try {
    const errors = await validate(new Comment(req.body));

    errors.length
      ? res
          .status(400)
          .contentType('application/json')
          .json({
            errors
          })
      : next();
  } catch (error) {
    res
      .status(400)
      .contentType('application/json')
      .json({ message: 'Cannot validate data sended' });
  }
}
