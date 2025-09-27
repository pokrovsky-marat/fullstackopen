import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
  const [showContent, setShowContent] = useState(false)
  const toggleShowContent = () => {
    setShowContent(!showContent)
  }
  const hanldeLike = () => {
    onLike({ likes: Number(blog.likes) + 1, id: blog.id })
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const showLess = { display: showContent ? 'none' : '' }
  const showMore = { display: showContent ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <div style={showLess}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleShowContent}>view</button>
      </div>

      <div style={showMore}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleShowContent}>hide</button>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={hanldeLike}>like</button>
        </div>
        <div>{blog?.user?.username}</div>
      </div>
    </div>
  )
}

export default Blog
