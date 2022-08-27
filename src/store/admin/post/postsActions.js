import { createPost, deletePost, getAllPosts, getAllGroups } from "../../../services/postService";
import { catReceived, postAdded, postRemoved, postsReceived } from "./postsSlice";
import { toast } from 'react-toastify';

export const addPost = post => async (dispatch) => {

    try {
        const { data, status } = await createPost(post);
        if (status === 201) {
            dispatch(postAdded(data));
            toast.success("Record added successfully.");
        } else {
            toast.error("An error occurred creating the record.");
        }
        // showCreateForm(false);

    } catch (err) {
        toast.error("An error occurred creating the record.");
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const { data, status } = await getAllPosts();
        if (status === 200) {
            dispatch(postsReceived(data));
        }
    } catch (err) {
        toast.error("There was an error receiving data.");
    }
}

export const removePost = postId => async (dispatch) => {
    try {
        const { status } = await deletePost(postId);
        if (status === 200) {
            dispatch(postRemoved(postId));
            toast.success("The record was deleted.");
        } else {
            toast.error("Failed to delete record.");
        }
    } catch (err) {
        toast.error("Failed to delete record.");
    }
}

export const getCats = () => async (dispatch) => {
    try {
        const { data: groupsData, status: groupStatus } = await getAllGroups();
        if (groupStatus === 200) {
            dispatch(catReceived(groupsData.filter(group => group.status === true)))
        }

    } catch (err) {
        toast.error("There was an error receiving data.");
    }
}

export const editPost = post => async (dispatch) => {

}