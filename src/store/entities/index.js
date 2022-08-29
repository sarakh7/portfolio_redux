import { combineReducers } from "redux";
import { catsSlice, eventsSlice, timelinesSlice } from './adminSlices';

export default combineReducers({
    [catsSlice.name]: catsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [timelinesSlice.name]: timelinesSlice.reducer,
})