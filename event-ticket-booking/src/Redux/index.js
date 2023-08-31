import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const rootReducers = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducers,
  devTools: false,
});

export default store;
