import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import allReducers from "./reducers";

export const store = configureStore({
   reducer: allReducers,
   middleware: [thunkMiddleware, logger],
   preloadedState: {},
});
