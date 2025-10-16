import { useDispatch } from 'react-redux'
import { create_ac } from '../reducers/anecdoteReducer'
import { notification_ac } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    dispatch(create_ac(event.target.anecdote.value))
    //Оттобразить сообщение на 5 секунд
    dispatch(notification_ac(`You created '${event.target.anecdote.value}'`))
    setTimeout(() => {
      dispatch(notification_ac(''))
    }, 5000)
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm
