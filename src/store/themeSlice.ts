import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  currentTheme: "retro" | "classic";
  loading: boolean;
}

const initialState: ThemeState = {
  currentTheme: "classic",
  loading: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"retro" | "classic">) => {
      state.currentTheme = action.payload;
    },
    setThemeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTheme, setThemeLoading } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
