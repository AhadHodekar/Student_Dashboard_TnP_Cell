import { combineReducers } from '@reduxjs/toolkit';
import adminAuthSlice from '../state/adminAuthSlice';
import studentAuthSlice from '../state/studentAuthSlice';
// Define your reducers here
const rootReducer = combineReducers({
    // Define your reducers here
    adminAuth: adminAuthSlice,
    studentAuth: studentAuthSlice
});

export default rootReducer;