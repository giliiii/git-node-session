import { createSlice } from "@reduxjs/toolkit";
//import {useUser} from './useUser'
const userSlice = createSlice({
    name: "userToken",
        initialState: {
        token: localStorage.getItem("userToken") || "",
        isUserLoggedIn: localStorage.getItem("userToken") ? true : false,
        userFullName: "",
        isAdmin: false
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("userToken", token)
        },

        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("userToken")
        }
    }
})

export default userSlice.reducer
export const { setToken, removeToken } = userSlice.actions
