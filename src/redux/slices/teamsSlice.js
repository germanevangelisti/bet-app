import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const { REACT_APP_SERVER_URL } = process.env;

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
  standing: {
    status: "idle",
    error: null,
    data: null,
  },
};

export const fetchTeams = createAsyncThunk(
  `${sliceName}/fetchTeams`,
  async (_args, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/teams`).then(
        (response) => response.json()
      );
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
        `${REACT_APP_SERVER_URL}/teams/standing`
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

export const { selectById: selectTeam, selectAll: selectAllTeams } =
  teamsAdapter.getSelectors((state) => state[sliceName].teams);

export const getTeamStatusService = (globalState) => globalState.teams.status;
export const getCurrentContenderTeams = (globalState) =>
  globalState.teams.standing.data?.contenderTeams;
export const getCurrentMediumTeams = (globalState) =>
  globalState.teams.standing.data?.mediumTeams;
export const getCurrentLooserTeams = (globalState) =>
  globalState.teams.standing.data?.looserTeams;
export const getLakersInfo = (globalState) =>
  globalState.teams.standing.data?.lakersInfo;

export const { resetTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
