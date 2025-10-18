import { createSlice } from '@reduxjs/toolkit'
import dbService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote_ac(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    create_ac(state, action) {
      state.push(action.payload)
    },
    getall_ac(state, action) {
      return action.payload
    },
  },
})
const { getall_ac, create_ac } = anecdoteSlice.actions

export const setAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await dbService.getAll()
    dispatch(getall_ac(anecdotes))
  }
}
export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await dbService.create(content)
    dispatch(create_ac(newAnecdote))
  }
}

export const { vote_ac } = anecdoteSlice.actions
export default anecdoteSlice.reducer
