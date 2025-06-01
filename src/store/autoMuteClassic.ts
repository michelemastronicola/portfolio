import { Middleware } from "@reduxjs/toolkit";
import { setTheme } from "./themeSlice";
import { toggleMute } from "./audioSlice";

export const autoMuteClassic: Middleware = (store) => (next) => (action) => {
  if (setTheme.match(action) && action.payload === "classic") {
    const state = store.getState();
    if (!state.audio.muted) {
      store.dispatch(toggleMute());
    }
  }

  return next(action);
};
