import axios from 'axios';

const SERVER_URL = "http://localhost:9000";


// @desc Get All Tab Menu
// @route Get http://localhost:9000/tab_menu
export const getAllTabMenues = () => {
    const url = `${SERVER_URL}/tab_menu`;
    return axios.get(url);
}

// @desc Create Tab Menu
// @route Post http://localhost:9000/tab_menu
export const createTabMenu = (value) => {
    const url = `${SERVER_URL}/tab_menu`;
    return axios.post(url, value);
}

// @desc Get All Tabs
// @route Get http://localhost:9000/tabs
export const getAllTabs = () => {
    const url = `${SERVER_URL}/tabs`;
    return axios.get(url);
}

// @desc Create Tab
// @route Post http://localhost:9000/tabs
export const createTab = (value) => {
    const url = `${SERVER_URL}/tabs`;
    return axios.post(url, value);
}

// @desc Create Tabs
// @route Post http://localhost:9000/tabs
export const createTabs = (values) => {
    const newTabs = [];
    const url = `${SERVER_URL}/tabs`;
    values.forEach(value => {
        const {data, status} = axios.post(url, value);
        if (status === 201) { 
            newTabs.push(data);
        }
    });
    return newTabs;
}

// @desc Delete TabMenu
// @route Delete http://localhost:9000/tab_menu
export const deleteTabMenu = (menuId) => {
    const url = `${SERVER_URL}/tab_menu/${menuId}`;
    return axios.delete(url);
}

// @desc Update TabMenu
// @route Put http://localhost:9000/tab_menu
export const updateTabMenu = (menuId, value) => {
    const url = `${SERVER_URL}/tab_menu/${menuId}`;
    return axios.put(url, value);
}

// @desc Delete Tab
// @route Delete http://localhost:9000/tabs
export const deleteTab = (tabId) => {
    const url = `${SERVER_URL}/tabs/${tabId}`;
    return axios.delete(url);
}