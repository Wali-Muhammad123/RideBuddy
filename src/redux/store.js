import { configureStore } from "@reduxjs/toolkit";
import rideReducer from './slices/rideSlice';
import userReducer from './slices/userSlice';


export const store =  configureStore({
    reducer: {
        ride: rideReducer,
        user: userReducer,
    }
})