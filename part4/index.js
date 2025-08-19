require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)



app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
    console.log('-------------------------');
    console.log(request.body);
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
