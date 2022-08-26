import axios from 'axios';

const SERVER_URL = "http://localhost:9000";

// @desc Get All Social By social ID
// @route Get http://localhost:9000/socials
export const getAllSocial = () => {
    const url = `${SERVER_URL}/socials`;
    return axios.get(url);
}

// @desc Get Social By social ID
// @route Get http://localhost:9000/socials/:socialId
export const getSocial = (socialId) => {
    const url = `${SERVER_URL}/socials/${socialId}`;
    return axios.get(url);
}

// @desc Create Social
// @route Post http://localhost:9000/social
export const createSocial = (social) => {
    const url = `${SERVER_URL}/socials`;
    return axios.post(url, social);
}

// @desc Update Social By ID
// @route Put http://localhost:9000/social/:socialId
export const updateSocial = (socialId, value) => {
    const url = `${SERVER_URL}/socials/${socialId}`;
    return axios.put(url, value);
}

// @desc Delete Social By ID
// @route Delete http://localhost:9000/social/:socialId
export const deleteSocial = (socialId) => {
    const url = `${SERVER_URL}/socials/${socialId}`;
    return axios.delete(url);
}