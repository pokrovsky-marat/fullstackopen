import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, type }) => {
  if (message) return <h2 className={type}>{message}</h2>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationText, setNotificationText] = useState(null)
  //info для зеленого, error для красного
  const [notificationType, setNotificationType] = useState('info')

  useEffect(() => {
    let tokenObject = JSON.parse(localStorage.getItem('tokenObject'))
    if (tokenObject) {
      setUser(tokenObject)
      blogService.setToken(tokenObject.token)
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
      //При успешном логине, мы сохраняем токен в закрытой переменной модуля
      //blogService token, которая используется для авторизованных запросов
      blogService.setToken(user.token)
      //сохраняем в локал сторидже чтобы при обновлении не приходилось заново логиниться
      localStorage.setItem('tokenObject', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      console.log(error)
      setNotificationType('error')
      setNotificationText('wrong username or password')
      setTimeout(() => {
        setNotificationText(null)
      }, 2000)
    }

    setUsername('')
    setPassword('')
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationType('info')
      setNotificationText(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => {
        setNotificationText(null)
      }, 2000)
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
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
  const createBlog = () => {
    return (
      <form onSubmit={handleCreate}>
        <h2>create new</h2>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => {
                setTitle(target.value)
              }}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value)
              }}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              value={url}
              onChange={({ target }) => {
                setUrl(target.value)
              }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    )
  }
  return (
    <div>
      <Notification message={notificationText} type={notificationType} />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          {loginInfo()}
          {createBlog()}
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
