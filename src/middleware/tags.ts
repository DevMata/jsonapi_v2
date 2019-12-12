import express from 'express';
import { Validator, validate, IsString, MinLength } from 'class-validator';

const validator = new Validator();

export class Tag {
  @IsString()
  @MinLength(1)
  name: string;

  constructor({ name }: { name: string }) {
    this.name = name;
  }
}

export function validateTagId(req: express.Request, res: express.Response, next: Function): void {
  const params = req.params;

  if (!validator.isMongoId(params['tag_id'])) {
    res.status(400).json({ message: 'Invalid mongo Id for tag' });
  } else {
    next();
  }
}

export async function validateTagBody(req: express.Request, res: express.Response, next: Function): Promise<void> {
  try {
    const errors = await validate(new Tag(req.body));

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
