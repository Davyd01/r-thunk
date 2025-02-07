import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import dataReducer from "./reducer";

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
