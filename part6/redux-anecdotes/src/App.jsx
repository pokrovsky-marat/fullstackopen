import { useDispatch, useSelector } from 'react-redux'
import { vote_ac, create_ac } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(vote_ac(id))
  }
  const create = (event) => {
    event.preventDefault()
    dispatch(create_ac(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
