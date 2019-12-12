import express from 'express';
import { Validator, ValidationError, IsString, IsArray, IsOptional, MinLength } from 'class-validator';

const validator = new Validator();

class Blog {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  constructor(title: string, content: string, tags: string[]) {
    this.title = title;
    this.content = content;
    this.tags = tags;
  }
}

export function requireJson(req: express.Request, res: express.Response, next: Function): void {
  if (req.headers['content-type'] !== 'application/json') {
    res
      .status(415)
      .contentType('application/json')
      .json({ message: 'JSON format needed' });
    res.end();
  } else {
    next();
  }
}

export function requireMongoId(req: express.Request, res: express.Response, next: Function): void {
  if (!validator.isMongoId(req.params!.blog_id)) {
    res.status(400).json({ message: 'Invalid mongo Id for blog' });
  } else {
    next();
  }
}

export async function validateBlogBody(req: express.Request, res: express.Response, next: Function): Promise<void> {
  try {
    console.log(req.body);
    await validator.validateOrReject(req.body as Blog);
    next();
  } catch (validation) {
    const validations: ValidationError[] = validation;

    res
      .status(400)
      .contentType('application/json')
      .json(validations.map(val => val.property + val.constraints));
  }
}
