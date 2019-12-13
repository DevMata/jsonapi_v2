import express from 'express';
import { Validator, validate, IsString, IsArray, IsOptional, MinLength } from 'class-validator';

const validator = new Validator();

export class Blog {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsArray({ each: true })
  @IsOptional()
  tags?: string[];

  constructor({ title, content, tags }: { title: string; content: string; tags?: string[] }) {
    this.title = title;
    this.content = content;
    this.tags = tags;
  }
}

export function validateBlogId(req: express.Request, res: express.Response, next: Function): void {
  const params = req.params;

  if (!validator.isMongoId(params['blog_id'])) {
    res.status(400).json({ message: 'Invalid mongo Id for blog' });
  } else {
    next();
  }
}

export async function validateBlogBody(req: express.Request, res: express.Response, next: Function): Promise<void> {
  try {
    const errors = await validate(new Blog(req.body));

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
