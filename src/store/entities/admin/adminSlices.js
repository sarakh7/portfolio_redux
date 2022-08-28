
import { createSlice } from '@reduxjs/toolkit';

const createAdminSlice = ({ name }) => createSlice({
    name,
    initialState: {
        itemList: [],
        showEditForm: false,
        showCreateForm: false,
        currentItem: []
    },
    reducers: {
        itemAdded: (state, action) => {
            state.posts.push(action.payload);
            state.showCreateForm = false;
        },
        itemRemoved: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        itemUpdated: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
            state.showEditForm = false;
        },
        itemReceived: (state, action) => {
            state.posts = action.payload;
        },
        itemSeledted: (state, action) => {
            state.currentPost = action.payload;
        },
        createFormCanceled: (state) => {
            state.showCreateForm = false;
        },
        createFormOpened: (state) => {
            state.showCreateForm = true;
        },
        editFormCanceled: (state) => {
            state.showEditForm = false;
        },
        editFormOpened: (state) => {
            state.showEditForm = true;
        },

    }
})

export const catsSlice = createAdminSlice({ name: 'cats' });
