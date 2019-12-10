import express from 'express'

function valContentType(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (req.headers['content-type'] !== 'applicacion/json') {
    res.status(415).write(
      JSON.stringify({
        message: 'JSON format needed'
      })
    )
  }

  next()
}

export { valContentType }
