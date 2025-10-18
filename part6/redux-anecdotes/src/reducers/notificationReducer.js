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
const { notification_ac } = notificationSlice.actions
export const setNotification = (text, time = 3) => {
  return async (dispatch) => {
    dispatch(notification_ac(text))
    setTimeout(() => {
      dispatch(notification_ac(''))
    }, +time * 1000)
  }
}
export default notificationSlice.reducer
