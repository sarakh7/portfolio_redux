import axios from 'axios';

const SERVER_URL = "http://localhost:9000";

// @desc Get Profile
// @route Get http://localhost:9000/profile
export const getProfile = () => {
    const url = `${SERVER_URL}/profile`;
    return axios.get(url);
}

// @desc Update Profile
// @route Put http://localhost:9000/profile
export const updateProfile = (profile) => {
    const url = `${SERVER_URL}/profile`;
    return axios.put(url, profile);
}