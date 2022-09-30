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
  },
});

export const { selectById: selectTeam, selectAll: selectAllTeams } =
  teamsAdapter.getSelectors((state) => state[sliceName].teams);

export const getTeamStatusService = (globalState) => globalState.teams.status;

export const { resetTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
