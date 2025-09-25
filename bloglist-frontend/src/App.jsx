import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch (error) {
      alert('wrong credentials')
    }

    setUsername('')
    setPassword('')
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
