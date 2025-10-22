import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, vote } from './services/dbService'
import { useContext } from 'react'
import LocalContext from './LocalContext'

const App = () => {
  const { notificationDispatch } = useContext(LocalContext)
  const queryClient = useQueryClient()
  const anecdoteMutationVote = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    //1  Повторить запрос еще раз или false если новый запрос не нужен
    retry: false,
  })

  const handleVote = (anecdote) => {
    anecdoteMutationVote.mutate(anecdote)
    notificationDispatch({
      type: 'SET',
      payload: `anecdote '${anecdote.content}' voted`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'SET', payload: null })
    }, 4000)
  }

  const anecdotes = result.data
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
