import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

const dataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = true;
    },
    clearLogin: (state) => {
      state.login = false;
    },
  },
});

export const { setLogin, clearLogin } = dataSlice.actions;
export default dataSlice.reducer;
