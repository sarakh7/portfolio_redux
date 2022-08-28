
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        cats: [],
        showEditForm: false,
        showCreateForm: false,
        currentPost: []
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
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
            state.showEditForm = false;
        },
        postsReceived: (state, action) => {
            state.posts = action.payload;
        },
        postSeledted: (state, action) => {
            state.currentPost = action.payload;
        },
        addPostCanceled: (state) =>{
            state.showCreateForm = false;
        },
        showAddPostForm: (state) =>{
            state.showCreateForm = true;
        },
        editPostCanceled: (state) =>{
            state.showEditForm = false;
        },
        showEditPostForm: (state) =>{
            state.showEditForm = true;
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
    showAddPostForm,
    editPostCanceled,
    showEditPostForm,
    postSeledted
} = postsSlice.actions;

export default postsSlice;