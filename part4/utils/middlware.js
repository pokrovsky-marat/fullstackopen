const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknownEndpoint' })
}
const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  next(error)
}
module.exports = { unknownEndpoint, errorHandler }
