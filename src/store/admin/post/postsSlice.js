
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        cats: []
    },
    reducers: {
        postAdded: (state, action) => {
            state.posts.push(action.payload);
        },
        postRemoved: (state, action) => {
        },
        postUpdated: (state, action) => {
        },
        catAdded: (state, action) => {
        },
        catRemoved: (state, action) => {
        },
        catUpdated: (state, action) => {

        },

    }
})

export const {
    postAdded,
    postRemoved,
    postUpdated,
    catAdded,
    catRemoved,
    catUpdated
} = postsSlice.actions;

export default postsSlice;