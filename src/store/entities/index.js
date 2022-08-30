import { combineReducers } from "redux";
import {
    catsSlice,
    eventsSlice,
    timelinesSlice,
    progressbarsSlice,
    progressbarListsSlice,
    productsSlice,
    usersSlice,
    aboutsSlice
} from './adminSlices';

export default combineReducers({
    [catsSlice.name]: catsSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [timelinesSlice.name]: timelinesSlice.reducer,
    [progressbarsSlice.name]: progressbarsSlice.reducer,
    [progressbarListsSlice.name]: progressbarListsSlice.reducer,
    [productsSlice.name]: productsSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [aboutsSlice.name]: aboutsSlice.reducer,
})