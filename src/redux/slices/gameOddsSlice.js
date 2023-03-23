import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { formatDateToString } from "../../utils/formatters.js";

const { REACT_APP_SERVER_URL } = process.env;

const gameOddsAdapter = createEntityAdapter({
  selectId: (gameOdd) => gameOdd.gameID,
});

const sliceName = "gameOdds";
const emptyInitialState = gameOddsAdapter.getInitialState();

const initialState = {
  ...emptyInitialState,
  status: "idle",
  error: null,
};

export const fetchGameOddsByDate = createAsyncThunk(
  `${sliceName}/fetchGameOddsByDate`,
  async (date, { rejectWithValue, fulfillWithValue }) => {
    try {
      const dateFormatted = formatDateToString(date);
      const response = await fetch(
        `${REACT_APP_SERVER_URL}/games/gameOddsByDate/${encodeURIComponent(
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
    [fetchGameOddsByDate.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchGameOddsByDate.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      gameOddsAdapter.setMany(state, action.payload);
    },
    [fetchGameOddsByDate.rejected]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
  },
});

export const { selectAll: selectAllGameOdds } = gameOddsAdapter.getSelectors(
  (state) => state[sliceName]
);

export default gamesSlice.reducer;
