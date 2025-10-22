import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/dbService'
import { useContext } from 'react'
import LocalContext from '../LocalContext'
const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(LocalContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      notificationDispatch({ type: 'SET', payload: null })
    }, 4000);
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
