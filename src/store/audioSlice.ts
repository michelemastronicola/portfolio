import { createSlice } from '@reduxjs/toolkit';

interface AudioState {
  muted: boolean;
}

const initialState: AudioState = {
  muted: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setMute: (state, action) => {
      state.muted = action.payload;
    },
  },
});

export const { toggleMute, setMute } = audioSlice.actions;
export const audioReducer = audioSlice.reducer;
