const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middlware')

//Мидлвар можно добавлть к отдельному обработчику пути
// в данном случае он добавляет к request свойство user
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(401).json({ error: 'No such blog note' })
  }
  const user = request.user
  if (blog?.user?.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'forbidden: not allowed to delete this resource' })
  }
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
//Все обработчики снизу подпадут под влияние мидлвара, перемещая его вврех в низ
//можно регулировать пути которым не нужна авторизация, как я сделал для get ☝

blogsRouter.use(userExtractor)
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  let blog = await Blog.findById(request.params.id)
  blog.likes = likes
  const result = await blog.save()
  response.status(200).json(result)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
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
module.exports = blogsRouter
