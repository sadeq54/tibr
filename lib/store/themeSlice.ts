import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

type ThemeState = { theme: Theme; manual: boolean };

const initialState: ThemeState = { theme: "dark", manual: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAutoTheme(state, action: PayloadAction<Theme>) {
      if (!state.manual) state.theme = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      state.manual = true;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      state.manual = true;
    },
  },
});

export const { setAutoTheme, setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
