const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const { unknownEndpoint, errorHandler } = require('./utils/middlware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log(`Connected to ${config.MONGODB_URI}`)
    
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
