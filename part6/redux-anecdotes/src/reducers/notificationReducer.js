import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeAction(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(changeAction(msg))
    setTimeout(() => {
      dispatch(changeAction(""))
    }, time)
  }
}

export const { changeAction } = notificationSlice.actions
export default notificationSlice.reducer
