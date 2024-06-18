import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   login: false,
   accessToken: ""
};

const dataSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
     setLogin: (state, action) => {
       state.login = true;
       state.accessToken = action.payload;
     },
     clearLogin: (state) => {
       state.login = false;
       state.accessToken = "";
     }
   }
});

export const { setLogin, clearLogin } = dataSlice.actions;
export default dataSlice.reducer;
