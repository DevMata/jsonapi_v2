import express from 'express'

function valContentType(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (req.headers['content-type'] !== 'application/json') {
    res.send('JSON format needed')
    res.end()
  } else {
    next()
  }
}

export { valContentType }
