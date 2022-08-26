import axios from 'axios';

const SERVER_URL = "http://localhost:9000";


// @desc Get All progress bars
// @route Get http://localhost:9000/progressbars
export const getAllProgressBars = () => {
    const url = `${SERVER_URL}/progressbars`;
    return axios.get(url);
}

// @desc Get All Progress bar list
// @route Get http://localhost:9000/progressbar_list
export const getAllProgressBarLists = () => {
    const url = `${SERVER_URL}/progressbar_list`;
    return axios.get(url);
}

// @desc Create Progress bar
// @route Post http://localhost:9000/progressbars
export const createProgressBar = (value) => {
    const url = `${SERVER_URL}/progressbars`;
    return axios.post(url, value);
}

// @desc Create Progress bar list
// @route Post http://localhost:9000/progressbar_list
export const createProgressBarList = (value) => {
    const url = `${SERVER_URL}/progressbar_list`;
    return axios.post(url, value);
}

// @desc Delete Progress bar
// @route Delete http://localhost:9000/progressbars
export const deleteProgressBar  = (progressId) => {
    const url = `${SERVER_URL}/progressbars/${progressId}`;
    return axios.delete(url);
}

// @desc Update Progress bar
// @route Put http://localhost:9000/progressbars
export const updateProgressBar  = (progressId, value) => {
    const url = `${SERVER_URL}/progressbars/${progressId}`;
    return axios.put(url, value);
}

// @desc Delete Progress bar
// @route Delete http://localhost:9000/progressbar_list
export const deleteProgressBarList  = (progressListId) => {
    const url = `${SERVER_URL}/progressbar_list/${progressListId}`;
    return axios.delete(url);
}

// @desc Update Progress bar
// @route Put http://localhost:9000/progressbar_list
export const updateProgressBarList  = (progressListId, value) => {
    const url = `${SERVER_URL}/progressbar_list/${progressListId}`;
    return axios.put(url, value);
}