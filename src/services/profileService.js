import config from "./config.json";
import axios from 'axios';

// @desc Get Profile
// @route Get http://localhost:9000/profile
export const getProfile = () => {
    const url = `${config.SERVER_URL}/profile`;
    return axios.get(url);
}

// @desc Update Profile
// @route Put http://localhost:9000/profile
export const updateProfile = (profile) => {
    const url = `${config.SERVER_URL}/profile`;
    return axios.put(url, profile);
}