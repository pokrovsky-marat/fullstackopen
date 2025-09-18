// Since the tests share the same database, simultaneous execution may cause problems,
//  which can be avoided by executing the tests with the option --test-concurrency=1
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.users)
})
test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all users are returned', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.users.length)
})

test('user without username or password is not added', async () => {
  let newUser = {
    username: 'lalala',
    name: 'Peter Pen',
  }
  await api.post('/api/users').send(newUser).expect(400)

  newUser = {
    password: 'password',
  }
  await api.post('/api/users').send(newUser).expect(400)

  //Проверяем что количество записей в БД не изменилось
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.users.length)
})
test('user with password less than 3 characters is not created', async () => {
  let newUser = {
    username: 'boris petrov',
    name: 'Peter Pen',
    password: '44',
  }
  await api.post('/api/users').send(newUser).expect(400)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.users.length)
})
// describe('deletion of a blog note', () => {
//   test('succeeds with status code 204 if id is valid', async () => {
//     let response = await api.get('/api/blogs')
//     const blogToUpdate = response.body[0]
//     await api.delete(`/api/blogs/${blogToUpdate.id}`).expect(204)
//     response = await api.get('/api/blogs')
//     const blogsAtEnd = response.body
//     const title = blogsAtEnd.map((n) => n.title)
//     assert(!title.includes(blogToUpdate.title))

//     assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
//   })
// })
// test('succeeds with status code 200 if blog note was updated', async () => {
//   const updatedBlog = {
//     title: 'React patterns',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com/',
//     likes: 777,
//   }
//   let response = await api.get('/api/blogs')
//   const blogToUpdate = response.body?.[0]
//   await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
//   response = await api.get('/api/blogs')
//   const blogsAtEnd = response.body

//   assert.equal(blogsAtEnd?.[0].likes, updatedBlog.likes)
// })

after(async () => {
  await mongoose.connection.close()
})
