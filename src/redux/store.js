import { configureStore } from "@reduxjs/toolkit";
import teams from "./slices/teamsSlice";
import season from "./slices/seasonSlice";
import games from "./slices/gamesSlice";

export const store = configureStore({
  reducer: { teams, season, games },
});
