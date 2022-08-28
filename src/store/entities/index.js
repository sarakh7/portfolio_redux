import { combineReducers } from "redux";
import adminReducer from './admin/index';

export default combineReducers({
    admin: adminReducer
})