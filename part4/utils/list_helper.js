const dummy = (blogs) => {
  // ...
  return 1
}
const totalLikes = (blogs) => blogs.reduce((acc, item) => acc + item.likes, 0)

module.exports = {
  dummy,
  totalLikes,
}
