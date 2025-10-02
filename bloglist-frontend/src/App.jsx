import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const Notification = ({ message, type }) => {
  if (message) return <h2 className={type}>{message}</h2>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationText, setNotificationText] = useState(null)
  //info для зеленого, error для красного
  const [notificationType, setNotificationType] = useState('info')
  const createFormRef = useRef()
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
  const onCreate = async (newBlogObject) => {
    try {
      createFormRef.current.toggleShowContent()
      const newBlog = await blogService.create(newBlogObject)
      //При Запросе с БД потом данные обновятся, а пока это нужно для оттображения кнопки remove
      setBlogs([...blogs, { ...newBlog, user: { username: user.username } }])

      setNotificationType('info')
      setNotificationText(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => {
        setNotificationText(null)
      }, 2000)
      return true
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
  const onLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((item) =>
          item.id === updatedBlog.id
            ? { ...item, likes: updatedBlog.likes }
            : item
        )
      )
    } catch (error) {
      alert(error)
    }
  }
  const onDelete = async (id) => {
    try {
      const response = await blogService.remove(id)
      if (response.status === 204) {
        setBlogs(blogs.filter((item) => item.id !== id))
      }
    } catch (error) {
      alert('Не удачная операция')
      console.log(error)
    }
  }
  const blogList = () => {
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={onLike}
            onDelete={onDelete}
            user={user}
          />
        ))}
      </div>
    )
  }
  const loginInfo = () => (
    <p>
      {user.name} logged in<button onClick={handleLogout}>logout</button>
    </p>
  )

  return (
    <div>
      <Notification message={notificationText} type={notificationType} />
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && (
        <div>
          {loginInfo()}
          <Togglable buttonName="create new blog" ref={createFormRef}>
            <CreateBlog onCreate={onCreate} />
          </Togglable>

          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
