import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { teamsDataMapper, getTeamsData } from "../../firebase/dataHelpers";

const teamsAdapter = createEntityAdapter({
  selectId: (team) => team.code,
  sortComparer: (a, b) => b.teamClass.localeCompare(a.teamClass),
});

const sliceName = "teams";
const emptyInitialState = teamsAdapter.getInitialState();

const initialState = {
  teams: emptyInitialState,
  schedule: null,
  status: "idle",
  error: null,
};

export const fetchTeams = createAsyncThunk(
  `${sliceName}/fetchTeams`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const teamsByFirebase = await getTeamsData().then((teams) => {
        return teams.map((team) => teamsDataMapper(team));
      });

      return fulfillWithValue(teamsByFirebase);
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
        "https://api.sportsdata.io/v3/nba/scores/json/Games/2023?key=0658e8d8e3814089911e3bcd8cd37215"
      ).then((response) => response.json());
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const teamsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetTeams: () => initialState,
  },
  extraReducers: {
    [fetchTeams.pending]: (state) => {
      state.status = "LOADING";
    },
    [fetchTeams.fulfilled]: (state, action) => {
      state.status = "SUCCEEDED";
      teamsAdapter.setAll(state.teams, action.payload);
    },
    [fetchTeams.rejected]: (state, action) => {
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

export const { selectById: selectTeam, selectAll: selectAllTeams } =
  teamsAdapter.getSelectors((state) => state[sliceName].teams);

export const getTeamStatusService = (globalState) => globalState.teams.status;

export const { resetTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
