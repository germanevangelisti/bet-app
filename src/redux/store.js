import { configureStore } from "@reduxjs/toolkit";
import teams from "./slices/teamsSlice";
import season from "./slices/seasonSlice";
import potencialCombinedBets from "./slices/potencialCombinedBetsSlice";

export const store = configureStore({
  reducer: { teams, season, potencialCombinedBets },
});
