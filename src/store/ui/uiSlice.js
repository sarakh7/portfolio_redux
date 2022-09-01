import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        notification: {
            type: '',
            message: ''
        },
        showNotification: false,
        panelLogo: ''
    },
    reducers: {
        logoReceived: (state, action) => {
            state.panelLogo = action.payload;
        },
        notificationSent: (state, action) => {
            state.notification = action.payload
            state.showNotification = true;
        },
        notificationShown: (state) => {
            state.showNotification = false;
        }
    }
})

export const {logoReceived, notificationSent, notificationShown} = uiSlice.actions

export default uiSlice;