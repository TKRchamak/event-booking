import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allActiveOrganizerList: [],
    allRequestOrganizerList: [],
    currentOrganizer: {},
    status: "idle",
    error: "",
};

const organizerSlice = createSlice({
    name: "organizer",
    initialState: initialState,
    reducers: {
        setAllActiveOrganizerList: (state, action) => {
            if (action.payload) {
                state.allActiveOrganizerList = action.payload;
                // AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
            }
        },
        setAllRequestOrganizerList: (state, action) => {
            if (action.payload) {
                state.allRequestOrganizerList = action.payload;
                // AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
            }
        },
        setCurrentOrganizer: (state, action) => {
            if (action.payload.data) {
                state.currentOrganizer = action.payload.data;
                // AsyncStorage.setItem("allActiveOrganizerList", JSON.stringify(action.payload.data))
            }
        },
    },
});

export const { setAllActiveOrganizerList, setAllRequestOrganizerList, setCurrentOrganizer } = organizerSlice.actions;

export default organizerSlice.reducer;