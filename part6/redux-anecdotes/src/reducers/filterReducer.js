import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		changeAction(state, action) {
			return  action.payload
		}
	}
})

export const {changeAction} = filterSlice.actions
export default filterSlice.reducer