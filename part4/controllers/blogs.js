const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const userId = request.body.user
  const user = await User.findById(userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
  user.blogs = [...user.blogs, result._id]
  await user.save()
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  let blog = await Blog.findById(request.params.id)
  blog.likes = likes
  const result = await blog.save()
  response.status(200).json(result)
})

module.exports = blogsRouter
