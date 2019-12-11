import express from 'express'
import { Validator } from 'class-validator'

const validator = new Validator()

export function requireJson(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(415).send(JSON.stringify({ message: 'JSON format needed' }))
    res.end()
  } else {
    next()
  }
}

export function requireMongoId(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (!validator.isMongoId(req.params!.blog_id)) {
    res.status(400).json({ message: 'Invalid mongo Id for blog' })
  } else {
    next()
  }
}
