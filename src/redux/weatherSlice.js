// src/redux/weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    setWeatherData(state, action) {
      state.data = action.payload;
      state.error = null;
    },
    setWeatherError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setWeatherData, setWeatherError } = weatherSlice.actions;

export default weatherSlice.reducer;
