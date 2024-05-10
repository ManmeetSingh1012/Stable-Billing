// first configure store
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from '../features/dataslice'

// configure store

export default configureStore({
reducer : dataReducer
})