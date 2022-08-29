import { configureStore } from "@reduxjs/toolkit";
import authSlcie from "./auth/authSlice";
import entitiesReducer from './entities'
import postsSlice from "./entities/post/postsSlice";

const store = configureStore({
    reducer: {
        auth: authSlcie.reducer,
        posts: postsSlice.reducer,
        entities: entitiesReducer
    }
});

export default store;