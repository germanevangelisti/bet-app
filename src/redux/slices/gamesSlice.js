import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { formatDayjsDate } from "../../utils/formatters.js";

const { REACT_APP_SERVER_URL } = process.env;

const gamesAdapter = createEntityAdapter({
  selectId: (game) => game.GameID,
});

const sliceName = "games";
const emptyInitialState = gamesAdapter.getInitialState();

const initialState = {
  games: emptyInitialState,
  status: "idle",
  error: null,
};

export const fetchGamesByDate = createAsyncThunk(
  `${sliceName}/fetchGamesByDate`,
  async (date, { rejectWithValue, fulfillWithValue }) => {
    try {
      const dateFormatted = formatDayjsDate(date);
      const response = await fetch(
        `${REACT_APP_SERVER_URL}/gamesByDate/${encodeURIComponent(
          dateFormatted
        )}` // date formatted: 2023-JAN-17
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const gamesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGamesByDate.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchGamesByDate.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      state.games = action.payload.gamesByDate;
    },
    [fetchGamesByDate.rejected]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
  },
});

export const { selectAll: selectAllGames } = gamesAdapter.getSelectors(
  (state) => state[sliceName].games
);

export const getGamesByDate = (globalState) => globalState.games.games;
export const getFetchTeamsClassStatus = (globalState) => globalState.games.status;

export default gamesSlice.reducer;
