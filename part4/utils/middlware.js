const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknownEndpoint' })
}
const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  console.log(error.message)
  next(error)
}
module.exports = { unknownEndpoint, errorHandler }
