import { createSlice } from "@reduxjs/toolkit";


/*const intialdata ={

   "login":false,
   "acessToken":"",

}*/
const initialState = {
   "login":true,
   //accessToken: ""
 };
 
 const dataSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
     setLogin: (state, action) => {
       state.login = action.payload;
     },
     /*setAccessToken: (state, action) => {
       state.accessToken = action.payload;
     },*/
     clearAuthData: (state) => {
       state.login = null;
       //state.accessToken = null;
     }
   }
 });

export const {setLogin, setAccessToken, clearAuthData} = dataSlice.actions;
export default dataSlice.reducer;

