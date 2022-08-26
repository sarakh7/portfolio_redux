import { configureStore } from "@reduxjs/toolkit";
import authSlcie from "./authSlice";

const store = configureStore({
    reducer: {
        auth: authSlcie.reducer
    }
});

export default store;


















// import { createStore } from "redux";

// const reduceFunc = (state = { counter: 0 }, action) => {
//     if (action.type === 'INC') {
//         return { counter: state.counter + 1 }
//     } else if(action.type === 'DEC') {
//         return { counter: state.counter - 1 }
//     } else if(action.type === 'ADDBY') {
//         return { counter: state.counter + action.payload }
//     }
//     return state
// }

// const store = createStore(reduceFunc);

// export default store;