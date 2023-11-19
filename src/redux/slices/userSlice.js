import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userSignup, userLogin, refreshToken } from "../thunks/userSliceThunks";

const initialState = {
    accessToken: null,
    refreshToken: null,
    userId: null,
    userType: null,
    error : null,
    loading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.userId = action.payload.user.pk;
            state.userType = action.payload.user.role;
            state.loading = false;
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(userSignup.pending, (state) => {
            state.loading = true;
        })
        .addCase(userSignup.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.userId = action.payload.user.pk;
            state.userType = action.payload.user.role;
        })
        .addCase(userSignup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(refreshToken.pending, (state, action) => {
            state.loading = true;

        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.access;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })

    }
    
});

export const { setAccessToken, setRefreshToken, setUserId, setUserType } = userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;
export const selectUserId = (state) => state.user.userId;
export const selectUserType = (state) => state.user.userType;

export default userSlice.reducer;