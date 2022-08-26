import axios from 'axios';

const SERVER_URL = "http://localhost:9000";


// @desc Get All Resumes
// @route Get http://localhost:9000/resume
export const getAllResumes = () => {
    const url = `${SERVER_URL}/resumes`;
    return axios.get(url);
}

// @desc Create Resume
// @route Post http://localhost:9000/resumes
export const createResume = (value) => {
    const url = `${SERVER_URL}/resumes`;
    return axios.post(url, value);
}


// @desc Get All Testimonials
// @route Get http://localhost:9000/testimonials
export const getAllTestimonials = () => {
    const url = `${SERVER_URL}/testimonials`;
    return axios.get(url);
}

// @desc Create Slider
// @route Post http://localhost:9000/testimonials
export const createTestimonial = (value) => {
    const url = `${SERVER_URL}/testimonials`;
    return axios.post(url, value);
}

// @desc Get All Clients
// @route Get http://localhost:9000/clients
export const getAllClients = () => {
    const url = `${SERVER_URL}/clients`;
    return axios.get(url);
}

// @desc Create Client
// @route Post http://localhost:9000/clients
export const createClient = (value) => {
    const url = `${SERVER_URL}/clients`;
    return axios.post(url, value);
}

// @desc Get All Clients Sections
// @route Get http://localhost:9000/clients_sections
export const getAllClientsSection = () => {
    const url = `${SERVER_URL}/clients_sections`;
    return axios.get(url);
}

// @desc Create Clients Section
// @route Post http://localhost:9000/clients_sections
export const createClientsSection = (value) => {
    const url = `${SERVER_URL}/clients_sections`;
    return axios.post(url, value);
}

// @desc Get All Pricings
// @route Get http://localhost:9000/pricings
export const getAllPricings = () => {
    const url = `${SERVER_URL}/pricings`;
    return axios.get(url);
}

// @desc Create Pricing
// @route Post http://localhost:9000/pricings
export const createPricing = (value) => {
    const url = `${SERVER_URL}/pricings`;
    return axios.post(url, value);
}

// @desc Get All About
// @route Get http://localhost:9000/abouts
export const getAllAbouts = () => {
    const url = `${SERVER_URL}/abouts`;
    return axios.get(url);
}

// @desc Create About
// @route Post http://localhost:9000/abouts
export const createAbout = (value) => {
    const url = `${SERVER_URL}/abouts`;
    return axios.post(url, value);
}

// @desc Get General Settings
// @route Get http://localhost:9000/general
export const getGeneral = () => {
    const url = `${SERVER_URL}/general`;
    return axios.get(url);
}

// @desc Create General Settings
// @route Post http://localhost:9000/general
export const createGeneral = (value) => {
    const url = `${SERVER_URL}/general`;
    return axios.post(url, value);
}

// @desc Update General Settings
// @route Put http://localhost:9000/general
export const updateGeneral = (value) => {
    const url = `${SERVER_URL}/general`;
    return axios.put(url, value);
}


// @desc Delete Resume
// @route Delete http://localhost:9000/resumes
export const deleteResume = (resumeId) => {
    const url = `${SERVER_URL}/resumes/${resumeId}`;
    return axios.delete(url);
}

// @desc Update Resume
// @route Put http://localhost:9000/resumes
export const updateResume = (resumeId, value) => {
    const url = `${SERVER_URL}/resumes/${resumeId}`;
    return axios.put(url, value);
}

// @desc Delete Testimonial
// @route Delete http://localhost:9000/testimonials
export const deleteTestimonial = (testiId) => {
    const url = `${SERVER_URL}/testimonials/${testiId}`;
    return axios.delete(url);
}

// @desc Update Testimonial
// @route Put http://localhost:9000/testiId
export const updateTestimonial = (testiId, value) => {
    const url = `${SERVER_URL}/testimonials/${testiId}`;
    return axios.put(url, value);
}

// @desc Delete Client
// @route Delete http://localhost:9000/clients
export const deleteClient = (testiId) => {
    const url = `${SERVER_URL}/clients/${testiId}`;
    return axios.delete(url);
}

// @desc Update Client
// @route Put http://localhost:9000/clients
export const updateClient = (testiId, value) => {
    const url = `${SERVER_URL}/clients/${testiId}`;
    return axios.put(url, value);
}

// @desc Delete Clients Section
// @route Delete http://localhost:9000/clients_sections
export const deleteClientsSection = (csId) => {
    const url = `${SERVER_URL}/clients_sections/${csId}`;
    return axios.delete(url);
}

// @desc Update Clients Section
// @route Put http://localhost:9000/clients_sections
export const updateClientsSection = (csId, value) => {
    const url = `${SERVER_URL}/clients_sections/${csId}`;
    return axios.put(url, value);
}

// @desc Delete Pricing
// @route Delete http://localhost:9000/pricings
export const deletePricing = (pricingId) => {
    const url = `${SERVER_URL}/pricings/${pricingId}`;
    return axios.delete(url);
}

// @desc Update Pricing
// @route Put http://localhost:9000/pricings
export const updatePricing = (pricingId, value) => {
    const url = `${SERVER_URL}/pricings/${pricingId}`;
    return axios.put(url, value);
}

// @desc Delete About
// @route Delete http://localhost:9000/abouts
export const deleteAbout = (aboutId) => {
    const url = `${SERVER_URL}/abouts/${aboutId}`;
    return axios.delete(url);
}

// @desc Update About
// @route Put http://localhost:9000/abouts
export const updateAbout = (aboutId, value) => {
    const url = `${SERVER_URL}/abouts/${aboutId}`;
    return axios.put(url, value);
}

// @desc Get All Files
// @route Get http://localhost:9000/files
export const getAllFiles = () => {
    const url = `${SERVER_URL}/files`;
    return axios.get(url);
}

// @desc Get File By Id
// @route Get http://localhost:9000/files
export const getFileById= (fileId) => {
    const url = `${SERVER_URL}/files/${fileId}`;
    return axios.get(url);
}

// @desc Create File
// @route Post http://localhost:9000/files
export const createFile = (value) => {
    const url = `${SERVER_URL}/files`;
    return axios.post(url, value);
}

// @desc Delete File
// @route Delete http://localhost:9000/files
export const deleteFile = (fileId) => {
    const url = `${SERVER_URL}/files/${fileId}`;
    return axios.delete(url);
}