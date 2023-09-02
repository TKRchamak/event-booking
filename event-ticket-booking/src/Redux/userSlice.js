import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  status: "idle",
  userData: {},
  token: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      if (action.payload.data) {
        state.userData = action.payload.data;
        AsyncStorage.setItem("userData", JSON.stringify(action.payload.data))
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        AsyncStorage.setItem("userToken", JSON.stringify(action.payload.token))
      }
    },
    clearUserData: (state, action) => {
      state.userData = {};
      state.token = "";
    },
  },
});

// export const userData = (state) => state.user.userData;
// export const userToken = (state) => state.user.token;


export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
