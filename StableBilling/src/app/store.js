/*// first configure store
import { configureStore } from "@reduxjs/toolkit";
import dataslice from "../features/dataslice";
import storage from "redux-persist/lib/storage";

import { persistReducer , persistStore } from "redux-persist";
// configure store


const persistconfig = {
   key :"root",
   storage,
}

const persistedReducer = persistReducer(persistconfig,dataslice)

export const store = configureStore({
   reducer :{
      persistedReducer
   }
})

export const persistor = persistStore(store)*/

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataslice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";



const persistConfig = {
   key: "root",
   storage,
};

const rootReducer = combineReducers({
   auth: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
  
});

export const persistor = persistStore(store);