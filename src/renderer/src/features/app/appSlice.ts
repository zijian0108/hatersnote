import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type Theme = Awaited<
  ReturnType<(typeof window)["api"]["getDeviceInfo"]>
>["system_theme"];
export interface AppState {
  system_theme: Theme;
}

const initialState: AppState = {
  system_theme: "light"
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateSystemTheme: (state, action: PayloadAction<Theme>) => {
      state.system_theme = action.payload;
    }
  }
});

export const { updateSystemTheme } = appSlice.actions;
export default appSlice.reducer;
