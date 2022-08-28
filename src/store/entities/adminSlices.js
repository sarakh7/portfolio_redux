
import { createSlice } from '@reduxjs/toolkit';

const createAdminSlice = ({ name }) => createSlice({
    name,
    initialState: {
        items: [],
        showEditForm: false,
        showCreateForm: false,
        currentItem: []
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
        },
        editFormOpened: (state) => {
            state.showEditForm = true;
        },

    }
})

export const catsSlice = createAdminSlice({ name: 'cats' });
