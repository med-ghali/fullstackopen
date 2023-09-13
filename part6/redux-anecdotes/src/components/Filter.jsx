import { useDispatch } from "react-redux"
import { changeAction } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(changeAction(event.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
