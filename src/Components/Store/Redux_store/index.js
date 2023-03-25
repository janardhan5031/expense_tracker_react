import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expenseReducer";
import authReducer from "./authReducer";


const store = configureStore({
    reducer: {
        expense: expenseReducer,
        auth:authReducer
    }
})

export default store;