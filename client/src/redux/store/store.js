import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
const store = configureStore({
    reducer: rootReducer
},
    // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare(),
    // devTools: true,
)

export default store;