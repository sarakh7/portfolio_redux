
import { createSlice } from '@reduxjs/toolkit';

const createAdminSlice = ({ name, initialState, reducers }) => createSlice({
    name,
    initialState: {
        items: [],
        showEditForm: false,
        showCreateForm: false,
        currentItem: [],
        ...initialState
    },
    reducers: {
        itemAdded: (state, action) => {
            state.items.push(action.payload);
            state.showCreateForm = false;
        },
        itemRemoved: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        itemUpdated: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            state.items[index] = action.payload;
            state.showEditForm = false;
            state.currentItem = {};
        },
        itemReceived: (state, action) => {
            state.items = action.payload;
        },
        itemSelected: (state, action) => {
            state.currentItem = action.payload;
        },
        createFormCanceled: (state) => {
            state.showCreateForm = false;
        },
        createFormOpened: (state) => {
            state.showCreateForm = true;
        },
        editFormCanceled: (state) => {
            state.showEditForm = false;
            state.currentItem = {};
        },
        editFormOpened: (state) => {
            state.showEditForm = true;
        },
        ...reducers

    }
})
export const catsSlice = createAdminSlice({name: 'cats'});
export const productsSlice = createAdminSlice({ name: 'products' });
export const usersSlice = createAdminSlice({ name: 'users' });
export const aboutsSlice = createAdminSlice({ name: 'abouts' });
export const testimonialsSlice = createAdminSlice({ name: 'testimonials' });
export const clientsSlice = createAdminSlice({ name: 'clients' });
export const eventsSlice = createAdminSlice({ name: 'events' });
export const progressbarsSlice = createAdminSlice({ name: 'progressbars' });
export const timelinesSlice = createAdminSlice({
    name: 'timelines',
    initialState: {
        innerItems: [],
        loadingInnerItems: true
    },
    reducers: {
        innerItemsReceived: (state, action) => {
            state.innerItems = action.payload;
            state.loadingInnerItems = false;
        },
        editFormOpened: (state) => {
            state.loadingInnerItems = true;
            state.showEditForm = true;
        },
        editFormCanceled: (state) => {
            state.showEditForm = false;
            state.currentItem = {};
            state.innerItems = []
        },
    }
});
export const progressbarListsSlice = createAdminSlice({
    name: 'progressbarLists',
    initialState: {
        innerItems: [],
        loadingInnerItems: true
    },
    reducers: {
        innerItemsReceived: (state, action) => {
            state.innerItems = action.payload;
            state.loadingInnerItems = false;
        },
        editFormOpened: (state) => {
            state.loadingInnerItems = true;
            state.showEditForm = true;
        },
        editFormCanceled: (state) => {
            state.showEditForm = false;
            state.currentItem = {};
            state.innerItems = []
        },
    }
});
