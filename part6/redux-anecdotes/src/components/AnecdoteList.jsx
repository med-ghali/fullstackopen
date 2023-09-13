import { useSelector, useDispatch } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"
import { changeAction } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) => {
      return anecdote.content.toUpperCase().startsWith(filter.toUpperCase())
    })
  )
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteAction(anecdote.id))
	dispatch(changeAction(`you voted ${anecdote.content}`))
	setTimeout( () => {
		dispatch(changeAction(""))
	}, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
