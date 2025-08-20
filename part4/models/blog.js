const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

module.exports = Blog
