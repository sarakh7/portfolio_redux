
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        featuresData: [],
        works: [],
        blogData: [],
        resume: [],
        clients: [],
        pricing: [],
        tesimonials: [],
        profileInfo: {},
        loadingAboutInfo: true,
        socials: [],
        headerLogo: '',
        footerLogo: '',
        siteTitle: '',
        copyRight: ''

    },
    reducers: {
        postsReceived: (state, action) => {
            state.featuresData = action.payload.featuresData;
            state.works = action.payload.worksData;
            state.blogData = action.payload.blogData;
        },
        resumeReceived: (state, action) => {
            state.resume = action.payload;
        },
        testimonialsReceived: (state, action) => {
            state.tesimonials = action.payload;
        },
        profileInfoReceived: (state, action) => {
            state.profileInfo = action.payload;
        },
        clientsReceived: (state, action) => {
            state.clients = action.payload;
        },
        pricingReceived: (state, action) => {
            state.pricing = action.payload;
        },
        socialsReceived: (state, action) => {
            state.socials = action.payload;
        },
        generalSettingsReceived: (state, action) => {
            state.headerLogo = action.payload.headerLogo;
            state.footerLogo = action.payload.footerLogo;
            state.siteTitle = action.payload.siteTitle;
            state.copyRight = action.payload.copyRight;
        },
        aboutInfoLoaded: (state) => {
            state.loadingAboutInfo = false
        }
    }
})

export const {
    postsReceived,
    resumeReceived,
    testimonialsReceived,
    clientsReceived,
    pricingReceived,
    generalSettingsReceived,
    profileInfoReceived,
    socialsReceived,
    aboutInfoLoaded,
} = themeSlice.actions;

export default themeSlice;