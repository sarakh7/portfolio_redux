import { combineReducers } from "redux";
import { catsSlice, eventsSlice, timelinesSlice, progressbarsSlice } from './adminSlices';

export default combineReducers({
    [catsSlice.name]: catsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [timelinesSlice.name]: timelinesSlice.reducer,
    [progressbarsSlice.name]: progressbarsSlice.reducer,
})