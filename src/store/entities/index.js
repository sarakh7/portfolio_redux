import { combineReducers } from "redux";
import adminReducer from './admin';
import themeSlice from "./theme/themeSlice";

export default combineReducers({
    admin: adminReducer,
    theme: themeSlice.reducer
})