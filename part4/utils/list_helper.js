const dummy = (blogs) => {
  // ...
  return 1
}
const totalLikes = (blogs) => blogs.reduce((acc, item) => acc + item.likes, 0)
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let result = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > result.likes) result = blog
  })
  return result
}
//Нужно получить автора который встречается чаще всего
//Данные представленны в виде массива объектов вида 👇
// [
//   {
//     _id: '5a422bc61b54a676234d17fc',
//     title: 'Type wars',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//     likes: 2,
//     __v: 0,
//   },
// ]
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  let authors = {}
  blogs.forEach((blog) => {
    if (!authors[blog.author]) authors[blog.author] = 1
    else authors[blog.author]++
  })
  let result = Object.entries(authors).reduce((max, item) =>
    item[1] > max[1] ? item : max
  )
  return {
    author: result[0],
    blogs: result[1],
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  let authors = {}
  blogs.forEach((blog) => {
    if (!authors[blog.author]) authors[blog.author] = blog.likes
    else authors[blog.author]+=blog.likes
  })
  let result = Object.entries(authors).reduce((max, item) =>
    item[1] > max[1] ? item : max
  )
  return {
    author: result[0],
    likes: result[1],
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
