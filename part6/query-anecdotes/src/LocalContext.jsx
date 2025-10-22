import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    default:
      return state
  }
}

const LocalContext = createContext()

export const LocalContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <LocalContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </LocalContext.Provider>
  )
}

export default LocalContext
