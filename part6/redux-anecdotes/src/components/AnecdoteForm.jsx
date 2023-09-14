import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
    dispatch(setNotification("a new note has been created", 5000))
    event.target.anecdote.value = ""
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
