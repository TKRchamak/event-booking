import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import organizerReducer from "./organizerSlice";
import eventReducer from "./eventSlice";

const rootReducers = combineReducers({
  user: userReducer,
  organizer: organizerReducer,
  event: eventReducer,
});

const store = configureStore({
  reducer: rootReducers,
  devTools: false,
});

export default store;
