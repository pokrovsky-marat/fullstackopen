const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
//request.token я получая в мидлваре, где присваиваю ему значение
blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response
      .status(400)
      .json({ error: 'user id is missing or not valid' })
  }
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })
  const result = await blog.save()
  response.status(201).json(result)
  user.blogs = [...user.blogs, result._id]
  await user.save()
})
blogsRouter.delete('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(401).json({ error: 'No such blog note' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (blog?.user?.toString() !== decodedToken.id.toString()) {
    return response
      .status(403)
      .json({ error: 'forbidden: not allowed to delete this resource' })
  }
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
