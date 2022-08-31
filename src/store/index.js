import { configureStore } from "@reduxjs/toolkit";
import authSlcie from "./auth/authSlice";
import entitiesReducer from './entities'
import uiSlice from "./ui/uiSlice";

const store = configureStore({
    reducer: {
        auth: authSlcie.reducer,
        ui: uiSlice.reducer,
        entities: entitiesReducer
    }
});

export default store;