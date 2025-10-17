import { createSlice } from '@reduxjs/toolkit'

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
export const { vote_ac, create_ac, getall_ac } = anecdoteSlice.actions
export default anecdoteSlice.reducer
