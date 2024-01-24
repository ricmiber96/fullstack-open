import { createSlice } from "@reduxjs/toolkit"

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
        logout: (state) => {
        state.user = null
        state.isAuthenticated = false
        }
    }
    })

export const { login, logout } = authSlice.actions
export default authSlice.reducer