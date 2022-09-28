import { configureStore } from "@reduxjs/toolkit";
import teams from "./slices/teamsSlice";

export const store = configureStore({
  reducer: { teams },
});
