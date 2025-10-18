import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { notification_ac } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    const text = event.target.anecdote.value
    event.preventDefault()

    dispatch(appendAnecdote(text))

    //Оттобразить сообщение на 5 секунд
    dispatch(notification_ac(`You created '${text}'`))
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
