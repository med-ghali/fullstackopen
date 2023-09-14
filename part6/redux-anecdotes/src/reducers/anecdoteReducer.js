import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../service/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAction(state, action) {
      let newState = state.map((s) => (s.id === action.payload.id ? action.payload : s))
      return newState.sort((a, b) => b.votes - a.votes)
    },
    appendAction(state, action) {
      state.push(action.payload)
    },
    setAction(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch(setAction(notes))
  }
}

export const addAnecdote = (content) => {
	return async (dispatch) => {
		const anecdote = await anecdoteService.createNew(content)
		dispatch(appendAction(anecdote))
	}
}

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.modify( { ...anecdote, votes: anecdote.votes+1})
		dispatch(voteAction(newAnecdote))
	}
}
export const { voteAction, appendAction, setAction } = anecdoteSlice.actions
export default anecdoteSlice.reducer
