import { useDispatch, useSelector } from 'react-redux'
import { vote_ac } from '../reducers/anecdoteReducer'
import { notification_ac } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((item) => item.content.includes(filter))
  })

  const vote = (id, content) => {
    dispatch(vote_ac(id))
    //Оттобразить сообщение на 5 секунд
    dispatch(notification_ac(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(notification_ac(''))
    }, 5000)
  }

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  )
}
export default AnecdoteList
