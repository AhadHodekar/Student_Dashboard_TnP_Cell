import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
    role: null,
    token: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null,
    adminData: null,
    isAuthenticated: false,
    isLoading: true


}

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.role = action.payload.role
            state.token = action.payload.accessToken
            state.user_id = action.payload.admin_id
            state.adminData = action.payload.adminData
            state.isAuthenticated = true
            state.isLoading = false
            localStorage.setItem("accessToken")
        },
        adminLogout: (state) => {
            state.role = null
            state.user_id = null
            state.token = null
            state.adminData = null
            state.isAuthenticated = false
            state.isLoading = true
            localStorage.removeItem("accessToken")
        }
    },
    extraReducers: () => {

    }
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions

export default adminAuthSlice.reducer