require('dotenv').config()
const express = require('express')
const { unknownEndpoint, errorHandler } = require('./utils/middlware')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
