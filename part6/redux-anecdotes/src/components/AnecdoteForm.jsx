import { useDispatch } from 'react-redux'
import { create_ac } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    dispatch(create_ac(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }
  return (
    <form onSubmit={create}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}
export default AnecdoteForm
