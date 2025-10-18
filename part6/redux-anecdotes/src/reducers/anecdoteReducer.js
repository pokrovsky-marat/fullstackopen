import { createSlice } from '@reduxjs/toolkit'
import dbService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote_ac(state, action) {
      return state.map((el) =>
        el.id == action.payload.id ? action.payload : el
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
const { getall_ac, create_ac, vote_ac } = anecdoteSlice.actions

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
export const appendVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes

    const anecdote = state.find((el) => el.id === id)
    const response = await dbService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(vote_ac(response))
    //Оттобразить сообщение на 5 секунд
    dispatch(setNotification(`You voted '${response.content}'`, 5))
  }
}

export default anecdoteSlice.reducer
