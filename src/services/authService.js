import axios from 'axios';

const SERVER_URL = "http://localhost:9000";


// @desc Get All Users
// @route Get http://localhost:9000/users
export const getAllUsers = () => {
    const url = `${SERVER_URL}/users`;
    return axios.get(url);
}
// @desc Get User By Id
// @route Get http://localhost:9000/users
export const getUserById = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.get(url);
}

// @desc Create user
// @route Post http://localhost:9000/users
export const createUser = (value) => {
    const url = `${SERVER_URL}/users`;
    return axios.post(url, value);
}

// @desc Update User
// @route Put http://localhost:9000/users
export const updateUser = (userId, value) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.put(url, value);
}

// @desc Delete User
// @route Delete http://localhost:9000/users
export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.delete(url);
}

// @desc Login user
// @route Post http://localhost:9000/login
export const loginUser = (value) => {
    const url = `${SERVER_URL}/login`;
    return axios.post(url, value);
}
