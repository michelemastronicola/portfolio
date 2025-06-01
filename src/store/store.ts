import { configureStore } from "@reduxjs/toolkit";
import { deviceReducer } from "./deviceSlice";
import { audioReducer } from "./audioSlice";
import { themeReducer } from "./themeSlice";
import { autoMuteClassic } from "./autoMuteClassic";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    audio: audioReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoMuteClassic),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;