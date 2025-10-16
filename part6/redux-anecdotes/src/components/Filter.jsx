import { useDispatch } from 'react-redux'
import { filter_ac } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleFilter = (event) => {
    dispatch(filter_ac(event.target.value))
  }
  return (
    <div>
      filter <input type="text" onChange={handleFilter} />
    </div>
  )
}
export default Filter
