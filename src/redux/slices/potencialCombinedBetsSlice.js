import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { formatDayjsDate } from '../../utils/combinedBetBuilder.js'

const { REACT_APP_SPORTSDATA_URL, REACT_APP_SPORTSDATA_KEY } = process.env;

const potencialCombinedBetsAdapter = createEntityAdapter({
  selectId: (bet) => bet.GameID,
});

const sliceName = "potencialCombinedBets";
const emptyInitialState = potencialCombinedBetsAdapter.getInitialState();

const initialState = {
  bets: emptyInitialState,
  status: "idle",
  error: null,
};

export const fetchGamesByDate = createAsyncThunk(
  `${sliceName}/fetchGamesByDate`,
  async (date, { rejectWithValue, fulfillWithValue }) => {
    try {
      const dateFormatted = formatDayjsDate(date)
      const response = await fetch(
        `${REACT_APP_SPORTSDATA_URL}/scores/json/GamesByDate/${dateFormatted}?key=${REACT_APP_SPORTSDATA_KEY}` // date format: 2023-JAN-17
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const potencialCombinedBetsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGamesByDate.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchGamesByDate.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      potencialCombinedBetsAdapter.setAll(state.bets, action.payload);
    },
    [fetchGamesByDate.rejected]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
  },
});

export const { selectAll: selectAllBets } =
  potencialCombinedBetsAdapter.getSelectors((state) => state[sliceName].bets);

export const getPotencialCombinedBets = (globalState) =>
  globalState.season.bets;

export default potencialCombinedBetsSlice.reducer;
