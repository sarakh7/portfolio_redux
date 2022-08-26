import axios from 'axios';

const SERVER_URL = "http://localhost:9000";

// @desc Get All Group
// @route Get http://localhost:9000/post_cats
export const getAllGroups = () => {
    const url = `${SERVER_URL}/post_cats`;
    return axios.get(url);
}

// @desc Get All Posts
// @route Get http://localhost:9000/posts
export const getAllPosts = () => {
    const url = `${SERVER_URL}/posts`;
    return axios.get(url);
}

// @desc Create Group
// @route Post http://localhost:9000/post_cats
export const createGroup = (value) => {
    const url = `${SERVER_URL}/post_cats`;
    return axios.post(url, value);
}

// @desc Create Post
// @route Post http://localhost:9000/posts
export const createPost = (value) => {
    const url = `${SERVER_URL}/posts`;
    return axios.post(url, value);
}

// @desc Delete Post
// @route Delete http://localhost:9000/posts
export const deletePost = (postId) => {
    const url = `${SERVER_URL}/posts/${postId}`;
    return axios.delete(url);
}

// @desc Update Post
// @route Put http://localhost:9000/posts
export const updatePost = (postId, value) => {
    const url = `${SERVER_URL}/posts/${postId}`;
    return axios.put(url, value);
}

// @desc Delete Group
// @route Delete http://localhost:9000/post_cats
export const deleteGroup = (catId) => {
    const url = `${SERVER_URL}/post_cats/${catId}`;
    return axios.delete(url);
}

// @desc Update Group
// @route Put http://localhost:9000/post_cats
export const updateGroup = (catId, value) => {
    const url = `${SERVER_URL}/post_cats/${catId}`;
    return axios.put(url, value);
}
