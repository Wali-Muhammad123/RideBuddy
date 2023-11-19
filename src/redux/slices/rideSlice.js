import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ride_id: null,
    inRide : false,
    rider: null,
    customer : null,
    origin: null,
    destination: null,
    travelPrice: null,
    travelTime: null
}

export const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        startRide: (state, action) => {
            state.inRide = true;
            state.rider = action.payload.rider;
            state.customer = action.payload.customer;
            state.travelPrice = action.payload.travelPrice;
            state.travelTime = action.payload.travelTime;
        },
        endRide: (state) => {
            state.inRide = false;
            state.rider = null;
            state.customer = null;
            state.origin = null;
            state.destination = null;
            state.travelPrice = null;
            state.travelTime = null;
        },
        setRider: (state, action) => {
            state.rider = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelPrice: (state, action) => {
            state.travelPrice = action.payload;
        },
        setTravelTime: (state, action) => {
            state.travelTime = action.payload;
        }
    }
    
});

export const { startRide, endRide, setRider,
     setCustomer, setOrigin, setDestination,
      setTravelPrice, setTravelTime } = rideSlice.actions;

// Selectors
export const selectInRide = (state) => state.ride.inRide;
export const selectRider = (state) => state.ride.rider;
export const selectCustomer = (state) => state.ride.customer;
export const selectOrigin = (state) => state.ride.origin;
export const selectDestination = (state) => state.ride.destination;
export const selectTravelPrice = (state) => state.ride.travelPrice;
export const selectTravelTime = (state) => state.ride.travelTime;


export default rideSlice.reducer;