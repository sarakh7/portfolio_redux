import { configureStore } from "@reduxjs/toolkit";
import authSlcie from "./auth/authSlice";
import postsSlice from "./entities/post/postsSlice";
import { catsSlice } from './entities/adminSlices';

const store = configureStore({
    reducer: {
        auth: authSlcie.reducer,
        posts: postsSlice.reducer,
        [catsSlice.name]: catsSlice.reducer,
    }
});

export default store;