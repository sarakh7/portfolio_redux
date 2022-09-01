import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        panelLogo: '',
        notifications: {
            type: '',
            message: ''
        },
        showNotification: false
    },
    reducers: {
        logoReceived: (state, action) => {
            state.panelLogo = action.payload;
        }
    }
})

export const {logoReceived} = uiSlice.actions

export default uiSlice;