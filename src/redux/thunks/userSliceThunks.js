import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import api from '../../utils/constants';
import { Alert } from "react-native";

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            console.log("email", email, "password", password)
            const response = await axios.post(api + 'accounts/login/', {
                email,
                password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error from server", error);
            Alert.alert("Invalid Credentials", error.response?.data?.detail || "An error occurred");
            return rejectWithValue(error.response?.data || "Error without response");
        }
    }
);


// export const userSignup = createAsyncThunk(
//     'user/signup',
//     async ({email,password,confirmPassword,firstName,lastName,role},{rejectWithValue}) => {
//         try {
//             const response = await axios.post(api+'accounts/register', {
//                 "email": email,
//                 "password1": password,
//                 "password2": confirmPassword,
//                 "first_name": firstName,
//                 "last_name": lastName,
//                 "role": role
//             },{
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log(">>>>>Response", response.data);
//             return response.data;
//         } catch (error) {
//             console.log(">>>>>Error", error.response.data);
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
export const userSignup = createAsyncThunk(
    'user/signup',
    async ({ email, password, confirmPassword, firstName, lastName, role }, { rejectWithValue }) => {
      try {
        const response = await fetch(api + 'accounts/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password1: password,
            password2: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            role: role,
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.log(">>>>>Error", errorData);
          return rejectWithValue(errorData);
        }
  
        const data = await response.json();
        console.log(">>>>>Response", data);
        return data;
      } catch (error) {
        console.error(">>>>>Error", error);
        return rejectWithValue(error);
      }
    }
  );
  

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async ({refreshToken},{rejectWithValue}) => {
        try {
            const response = await axios.post(api+'accounts/token/refresh/',{
                "refresh": refreshToken
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);