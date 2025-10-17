import { useDispatch } from 'react-redux'
import { create_ac } from '../reducers/anecdoteReducer'
import { notification_ac } from '../reducers/notificationReducer'
import dbService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    const text = event.target.anecdote.value
    event.preventDefault()
    dbService.create(text).then((anecdote) => {
      dispatch(create_ac(anecdote))
      //Оттобразить сообщение на 5 секунд
      dispatch(notification_ac(`You created '${text}'`))
      setTimeout(() => {
        dispatch(notification_ac(''))
      }, 5000)
    })
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
