import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter_ac(state, action) {
      return action.payload
    },
  },
})
export const { filter_ac } = filterSlice.actions
export default filterSlice.reducer
