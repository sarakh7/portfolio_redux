import axios from 'axios';

const SERVER_URL = "http://localhost:9000";


// @desc Get All Events
// @route Get http://localhost:9000/events
export const getAllEvents = () => {
    const url = `${SERVER_URL}/events`;
    return axios.get(url);
}

// @desc Get All Timelines
// @route Get http://localhost:9000/timelines
export const getAllTimelines = () => {
    const url = `${SERVER_URL}/timelines`;
    return axios.get(url);
}

// @desc Create Event
// @route Post http://localhost:9000/events
export const createEvent = (value) => {
    const url = `${SERVER_URL}/events`;
    return axios.post(url, value);
}

// @desc Create Timeline
// @route Post http://localhost:9000/timelines
export const createTimeline = (value) => {
    const url = `${SERVER_URL}/timelines`;
    return axios.post(url, value);
}

// @desc Delete Event
// @route Delete http://localhost:9000/events
export const deleteEvent = (eventId) => {
    const url = `${SERVER_URL}/events/${eventId}`;
    return axios.delete(url);
}

// @desc Update Event
// @route Put http://localhost:9000/events
export const updateEvent = (eventId, value) => {
    const url = `${SERVER_URL}/events/${eventId}`;
    return axios.put(url, value);
}

// @desc Delete Timeline
// @route Delete http://localhost:9000/timelines
export const deleteTimeline = (eventId) => {
    const url = `${SERVER_URL}/timelines/${eventId}`;
    return axios.delete(url);
}

// @desc Update Timeline
// @route Put http://localhost:9000/timelines
export const updateTimeline = (eventId, value) => {
    const url = `${SERVER_URL}/timelines/${eventId}`;
    return axios.put(url, value);
}