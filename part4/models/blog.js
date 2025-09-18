const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    required: true,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    minLength: 4,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
