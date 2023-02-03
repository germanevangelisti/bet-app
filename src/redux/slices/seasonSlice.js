import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_SERVER_URL } = process.env;

const sliceName = "season";

const initialState = {
  currentSeason: null,
  schedule: null,
  standing: {
    status: "idle",
    error: null,
    data: null,
  },
  status: "idle",
  error: null,
};

export const fetchCurrentSeason = createAsyncThunk(
  `${sliceName}/fetchCurrentSeason`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER_URL}/currentSeason`
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
        `${REACT_APP_SERVER_URL}/currentSeason/schedule`
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTeamsStanding = createAsyncThunk(
  `${sliceName}/fetchTeamsStanding`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        `${REACT_APP_SERVER_URL}/teamsStanding`
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
    [fetchTeamsStanding.pending]: (state) => {
      state.standing.status = "LOADING";
    },
    [fetchTeamsStanding.fulfilled]: (state, action) => {
      state.standing.status = "SUCCEEDED";
      state.standing.data = action.payload;
    },
    [fetchTeamsStanding.rejected]: (state, action) => {
      state.standing.status = "FAILED";
      state.standing.error = action.error.message;
    },
  },
});

export const getCurrentSeason = (globalState) =>
  globalState.season.currentSeason;
export const getCurrentContenderTeams = (globalState) =>
  globalState.season.standing.data?.contenderTeams;
export const getCurrentMediumTeams = (globalState) =>
  globalState.season.standing.data?.mediumTeams;
export const getCurrentLooserTeams = (globalState) =>
  globalState.season.standing.data?.looserTeams;
export const getLakersInfo = (globalState) =>
  globalState.season.standing.data?.lakersInfo;

export default seasonSlice.reducer;
