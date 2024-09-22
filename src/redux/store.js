// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import temperatureReducer from "./temperatureSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    temperature: temperatureReducer,
  },
});

export default store;
