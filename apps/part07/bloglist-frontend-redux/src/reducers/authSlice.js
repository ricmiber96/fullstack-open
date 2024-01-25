import { createSlice } from "@reduxjs/toolkit"
import  authService  from "../services/auth"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
        console.log(action.payload)
        state.user = action.payload
        state.isAuthenticated = true
        },
        userFromLocalStorage: (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        },
        logout: (state) => {
        state.user = null
        state.isAuthenticated = false
        },
        createUser: (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        }
    }
    })

export const { login, logout, createUser, userFromLocalStorage } = authSlice.actions
export default authSlice.reducer

export const createNewUser = (user) => async (dispatch) => {
    const newUser = await authService.signup(user)
    dispatch(createUser(newUser))
}

export const loginUser = (credentials) => async (dispatch) => {
    const user = await authService.login(credentials)
    dispatch(login(user))
}

export const getUserFromLocalStorage = () => (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON) {
      const userParser = JSON.parse(loggedUserJSON)
      dispatch(userFromLocalStorage(userParser))
    }
}
