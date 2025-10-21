import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll } from './services/dbService'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    //1  Повторить запрос еще раз или false если новый запрос не нужен
    retry:false
  })
  console.log(result)
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data
  console.log(anecdotes)
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Anecdote Service not available due to problems in Server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
