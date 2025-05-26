import { createSlice } from "@reduxjs/toolkit";

interface DeviceState {
  isMobile: boolean;
}

const initialState: DeviceState = {
  isMobile: false,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = deviceSlice.actions;
export const deviceReducer = deviceSlice.reducer;