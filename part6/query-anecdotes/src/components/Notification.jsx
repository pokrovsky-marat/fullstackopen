import { useContext } from 'react'
import LocalContext from '../LocalContext'

const Notification = () => {
  const { notification } = useContext(LocalContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notification) return <div style={style}>{notification}</div>
  return null
}

export default Notification
