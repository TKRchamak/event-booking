import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allEventList: [],
    organizersEventList: [],
    currentEvent: {},
    status: "idle",
    error: "",
};

const organizerSlice = createSlice({
    name: "organizer",
    initialState: initialState,
    reducers: {
        setAllEventList: (state, action) => {
            if (action.payload.data) {
                state.allEventList = action.payload.data;
                // AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
            }
        },
        setOrganizerEventList: (state, action) => {
            state.organizersEventList = action.payload;
            // AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
        },
        setCurrentEvent: (state, action) => {
            if (action.payload.data) {
                state.currentEvent = action.payload.data;
                AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
            }
        },
    },
});

export const { setAllEventList, setOrganizerEventList, setCurrentEvent } = organizerSlice.actions;

export default organizerSlice.reducer;