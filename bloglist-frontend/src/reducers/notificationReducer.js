import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    addNotification (state,action){
      const content = action.payload
      state.push(content)
      return  state
    },
    removeNotification  (state, action) {
       state.pop(action.payload)
       return state
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer