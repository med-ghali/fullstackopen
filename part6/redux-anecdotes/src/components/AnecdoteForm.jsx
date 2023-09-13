import { addAction } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { changeAction } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    dispatch(addAction(event.target.anecdote.value))
	dispatch(changeAction("a new note has been created"))
	setTimeout( () => {
		dispatch(changeAction(""))
	}, 5000)
	event.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default AnecdoteForm
