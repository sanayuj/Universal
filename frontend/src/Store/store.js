import { configureStore } from "@reduxjs/toolkit";
import useReducer from '../features/setUser'


export default configureStore({
    reducer:{
        user:useReducer
    }
})