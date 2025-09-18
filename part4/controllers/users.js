const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})
usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  if (!password) {
    return response
      .status(400)
      .json({ error: 'You should provide `password` property ' })
  }
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'expected `password` to be more than 3 characters' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
