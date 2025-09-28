import { useState } from 'react'

const Blog = ({ blog, onLike, user, onDelete }) => {
  const [showContent, setShowContent] = useState(false)
  const toggleShowContent = () => {
    setShowContent(!showContent)
  }
  const handleLike = () => {
    onLike({ likes: Number(blog.likes) + 1, id: blog.id })
  }
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by  ${blog.author}`)) {
      onDelete(blog.id)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {!showContent && (
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowContent}>view</button>
        </div>
      )}
      {showContent && (
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowContent}>hide</button>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog?.user?.username}</div>
          {blog?.user?.username === user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
