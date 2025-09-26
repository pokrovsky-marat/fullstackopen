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
    let token = JSON.parse(localStorage.getItem('tokenObject'))
    if (token) {
      setUser(token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('tokenObject')
    setUser(null)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      localStorage.setItem('tokenObject', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.log(error)
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
  const loginInfo = () => (
    <p>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
    </p>
  )
  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          {loginInfo()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
