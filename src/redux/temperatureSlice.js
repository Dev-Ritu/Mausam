// src/redux/temperatureSlice.js
import { createSlice } from '@reduxjs/toolkit';

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {
    unit: 'Celsius', // Default to Celsius
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    },
  },
});

export const { toggleUnit } = temperatureSlice.actions;

export default temperatureSlice.reducer;
