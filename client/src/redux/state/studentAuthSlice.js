import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
    role: null,
    token: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null,
    studentData: null,
    isAuthenticated: false,
    isLoading: true

}

const studentAuthSlice = createSlice({
    name: "studentAuth",
    initialState,
    reducers: {
        studentLogin: (state, action) => {
            state.role = action.payload.role
            state.token = action.payload.accessToken
            state.user_id = action.payload.student_id
            studentData = action.payload.studentData
            state.isAuthenticated = true
            state.isLoading = false
            localStorage.setItem("accessToken")
        },
        studentLogout: (state) => {
            state.role = null
            state.user_id = null
            state.token = null
            studentData = null
            state.isAuthenticated = false
            state.isLoading = true
            localStorage.removeItem("accessToken")
        }
    }
});

export const { studentLogin, studentLogout } = studentAuthSlice.actions

export default studentAuthSlice.reducer