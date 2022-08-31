import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        panelLogo: '',
    },
    reducers: {
        logoReceived: (state, action) => {
            state.panelLogo = action.payload;
        }
    }
})

export const {logoReceived} = uiSlice.actions

export default uiSlice;