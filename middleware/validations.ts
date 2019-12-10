import express from 'express'

function requireJson(
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

export { requireJson }
