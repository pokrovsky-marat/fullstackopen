const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { response } = require('express')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})
test('verify that  the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  assert.notStrictEqual(response.body?.[0].id, undefined)
})
test('a valid blog note can be added ', async () => {
  const newBlog = {
    title: 'My app testing',
    author: 'Marat Isaev',
    url: 'https://marat.isaev.kg',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length + 1)

  const title = response.body.map((n) => n.title)
  const author = response.body.map((n) => n.author)
  const url = response.body.map((n) => n.url)
  const likes = response.body.map((n) => n.likes)

  assert(title.includes('My app testing'))
  assert(author.includes('Marat Isaev'))
  assert(url.includes('https://marat.isaev.kg'))
  assert(likes.includes(5))
})
test('if likes property is missing, default value is 0', async () => {
  const newBlog = {
    title: 'My app testing',
    author: 'Marat Isaev',
    url: 'https://marat.isaev.kg',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')

  const likes = response.body?.[response.body.length - 1].likes
  console.log(likes)
  assert.strictEqual(likes, 0)
})
test('blog without title or url is not added', async () => {
  let newBlog = {
    author: 'Marat Isaev',
    url: 'https://marat.isaev.kg',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)

  newBlog = {
    author: 'Marat Isaev',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)

  //Проверяем что количество записей в БД не изменилось
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})
describe('deletion of a blog note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    let response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    response = await api.get('/api/blogs')
    const blogsAtEnd = response.body
    const title = blogsAtEnd.map((n) => n.title)
    assert(!title.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
