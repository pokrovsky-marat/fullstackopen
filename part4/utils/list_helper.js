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
    else authors[blog.author] += blog.likes
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
