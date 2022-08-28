import { combineReducers } from "redux";
import postsSlice from "./post/postsSlice";

export default combineReducers({
    posts: postsSlice.reducer
})
