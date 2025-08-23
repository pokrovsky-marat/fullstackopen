const dummy = (blogs) => {
  // ...
  return 1
}
const totalLikes = (blogs) => blogs.reduce((acc, item) => acc + item.likes, 0)
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  result = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > result.likes) result = blog
  })
  return result
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
