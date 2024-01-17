import { createSlice } from "@reduxjs/toolkit"

const initialState = 'This is a notification'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state = action.payload
            return state
        },
        clearNotification: () => {
            return ''
        }
    }
})

export const {setNotification,clearNotification} = notificationSlice.actions

export const setTimedNotification = (notification, time) => {
    return async(dispatch) => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer