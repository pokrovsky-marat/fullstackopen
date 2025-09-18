const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknownEndpoint' })
}
const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }

  console.log(error)
  next(error)
}
module.exports = { unknownEndpoint, errorHandler }
