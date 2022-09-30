import {
  createSlice,
  //   createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const { REACT_APP_SPORTSDATA_URL, REACT_APP_SPORTSDATA_KEY } = process.env;

// const seasonAdapter = createEntityAdapter();

const sliceName = "season";

const initialState = {
  currentSeason: null,
  schedule: null,
  status: "idle",
  error: null,
};

export const fetchCurrentSeason = createAsyncThunk(
  `${sliceName}/fetchCurrentSeason`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_SPORTSDATA_URL}/scores/json/CurrentSeason?key=${REACT_APP_SPORTSDATA_KEY}`
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSchedule = createAsyncThunk(
  `${sliceName}/fetchSchedule`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_SPORTSDATA_URL}/scores/json/Games/2023?key=${REACT_APP_SPORTSDATA_KEY}`
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const seasonSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurrentSeason.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchCurrentSeason.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      state.currentSeason = action.payload;
    },
    [fetchCurrentSeason.rejected]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
    [fetchSchedule.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchSchedule.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      state.schedule = action.payload;
    },
    [fetchSchedule.rejected]: (state, action) => {
      state.status = "FAILED";
      state.error = action.error.message;
    },
  },
});

export const getCurrentSeason = (globalState) =>
  globalState.season.currentSeason;

export default seasonSlice.reducer;
