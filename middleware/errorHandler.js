export const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let msg = err.message
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  if (err.kind === 'ObjectId') {
    msg = 'Resource not found'
    statusCode = 404
  }
  res.status(statusCode).json({ errors: [{ msg }] })
}
