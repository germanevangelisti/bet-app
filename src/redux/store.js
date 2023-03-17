import { configureStore } from "@reduxjs/toolkit";
import teams from "./slices/teamsSlice";
import season from "./slices/seasonSlice";
import games from "./slices/gamesSlice";
import gameOdds from "./slices/gameOddsSlice";

export const store = configureStore({
  reducer: { teams, season, games, gameOdds },
});
