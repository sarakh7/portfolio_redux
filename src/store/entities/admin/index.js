import { combineReducers } from "redux";
import postsSlice from "./post/postsSlice";
import { catsSlice } from "./adminSlices";

const adminReducer = combineReducers({
    posts: postsSlice.reducer,
    [catsSlice.name]: catsSlice.reducer,
})

export default adminReducer;