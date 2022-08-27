
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        cats: [],
        showEditForm: false,
        showCreateForm: false
    },
    reducers: {
        postAdded: (state, action) => {
            state.posts.push(action.payload);
            state.showCreateForm = false;
        },
        postRemoved: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        postUpdated: (state, action) => {
        },
        postsReceived: (state, action) => {
            state.posts = action.payload;
        },
        addPostCanceled: (state) =>{
            state.showCreateForm = false;
        },
        showAddPostForm: (state) =>{
            state.showCreateForm = true;
        },
        editPostCanceled: (state) =>{
            state.showCreateForm = false;
        },
        showEditPostForm: (state) =>{
            state.showCreateForm = true;
        },
        catAdded: (state, action) => {
            state.cats.push(action.payload);
        },
        catRemoved: (state, action) => {
            state.cats = state.cats.filter(cat => cat.id !== action.payload)
        },
        catUpdated: (state, action) => {

        },
        catReceived: (state, action) => {
            state.cats = action.payload;
        }

    }
})

export const {
    postAdded,
    postRemoved,
    postUpdated,
    postsReceived,
    catAdded,
    catRemoved,
    catUpdated,
    catReceived,
    addPostCanceled,
    showAddPostForm
} = postsSlice.actions;

export default postsSlice;