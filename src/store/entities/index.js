import { combineReducers } from "redux";
import { catsSlice, eventsSlice } from './adminSlices';

export default combineReducers({
    [catsSlice.name]: catsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
})