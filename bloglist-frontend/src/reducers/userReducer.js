import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {

    setUser(state, action) {
      state.push(action.payload)
    },

    unsetUser(state, action) {
      state.pop(action.payload)
    }
  }
})


export const doLogin = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password,
    });
    console.log(user)
    dispatch(setUser(user))
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(user));
  }
}

export const refreshUser = (user) => {
  return async dispatch => {
    dispatch(setUser(user))
    blogService.setToken(user.token);
  }
}

export const doLogout = (user) => {
  return async dispatch => {
    blogService.setToken('');
    dispatch(unsetUser(user))
  }
}


export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer