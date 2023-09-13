import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		changeAction(state, action) {
			return  action.payload
		}
	}
})

export const {changeAction} = notificationSlice.actions
export default notificationSlice.reducer