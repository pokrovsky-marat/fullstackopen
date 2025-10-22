import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    const text = event.target.anecdote.value
    event.preventDefault()

    dispatch(appendAnecdote(text))

    //Оттобразить сообщение на 5 секунд
    dispatch(setNotification(`You created '${text}'`), 5)

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
