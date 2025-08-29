const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
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
// test('note without content is not added', async () => {
//   const newNote = {
//     important: true,
//   }

//   await api.post('/api/notes').send(newNote).expect(400)

//   const notesAtEnd = await helper.notesInDb()

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
// })

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map((e) => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })
// test('a specific note can be viewed', async () => {
//   const notesAtStart = await helper.notesInDb()
//   const noteToView = notesAtStart[0]

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultNote.body, noteToView)
// })
// test('a note can be deleted', async () => {
//   const notesAtStart = await helper.notesInDb()
//   const noteToDelete = notesAtStart[0]

//   await api
//     .delete(`/api/notes/${noteToDelete.id}`)
//     .expect(204)

//   const notesAtEnd = await helper.notesInDb()

//   const contents = notesAtEnd.map(n => n.content)
//   assert(!contents.includes(noteToDelete.content))

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
// })
after(async () => {
  await mongoose.connection.close()
})
