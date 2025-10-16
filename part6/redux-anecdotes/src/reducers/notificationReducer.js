import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notification_ac(state, action) {
      return action.payload
    },
  },
})
export const { notification_ac } = notificationSlice.actions
export default notificationSlice.reducer
