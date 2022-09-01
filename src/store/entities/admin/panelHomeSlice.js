
import { createSlice } from '@reduxjs/toolkit';

const panelHomeSlice = createSlice({
    name: "panelHome",
    initialState: {
        postNum: 0,
        productNum: 0,
        eventNum: 0,
        timelineNum: 0,
        progressNum: 0,
        menuNum: 0
    },
    reducers: {
        postNumReceived: (state, action) => {
            state.postNum = action.payload;
        },
        productNumReceived: (state, action) => {
            state.productNum = action.payload;
        },
        eventNumReceived: (state, action) => {
            state.eventNum = action.payload;
        },
        timelineNumReceived: (state, action) => {
            state.timelineNum = action.payload;
        },
        progressNumReceived: (state, action) => {
            state.progressNum = action.payload;
        },
        menuNumReceived: (state, action) => {
            state.menuNum = action.payload;
        }
    }
})

export const {
    postNumReceived,
    productNumReceived,
    eventNumReceived,
    timelineNumReceived,
    progressNumReceived,
    menuNumReceived
} = panelHomeSlice.actions

export default panelHomeSlice;