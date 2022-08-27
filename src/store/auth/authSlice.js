
import { createSlice } from '@reduxjs/toolkit';

const authSlcie = createSlice({
    name: "auth",
    initialState: {
        auth: {},
        loadingUser: true
    },
    reducers: {
        login: (state, action) => {
            state.auth = {
                user: action.payload.user,
                roles: action.payload.roles,
                accessToken: action.payload.accessToken
            }
            state.loadingUser = false;
        },
        userLoaded: (state) => {
            state.loadingUser = false;
        },
        logout: (state, action) => {
            state.auth = {
                user: "",
                roles: [],
                accessToken: ""
            }
        }
    }
})

export const { login, logout, userLoaded } = authSlcie.actions;

export default authSlcie;