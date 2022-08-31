import { configureStore } from "@reduxjs/toolkit";
import authSlcie from "./auth/authSlice";
import entitiesReducer from './entities'

const store = configureStore({
    reducer: {
        auth: authSlcie.reducer,
        entities: entitiesReducer
    }
});

export default store;