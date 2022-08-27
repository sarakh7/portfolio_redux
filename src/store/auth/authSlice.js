
import { createSlice } from '@reduxjs/toolkit';

const authSlcie = createSlice({
    name: "auth",
    initialState: {
        auth: {},
        loadingUser: true,
        errorText: ''
    },
    reducers: {
        login: (state, action) => {
            state.auth = {
                user: action.payload.user,
                accessToken: action.payload.accessToken
            }
            state.errorText = "";
            state.loadingUser = false;
        },
        userLoaded: (state, action) => {
            state.loadingUser = false;
        },
        logout: (state) => {
            state.errorText = "";
            state.auth = {
                user: "",
                accessToken: ""
            }
        },
        errorOccurred: (state, action) => {
            state.errorText = action.payload;
        }
    }
})

export const { login, logout, userLoaded, errorOccurred } = authSlcie.actions;

export default authSlcie;