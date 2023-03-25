import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../../utils/customAxios";

const { REACT_APP_SERVER_URL } = process.env;

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    const response = await customAxios.post(
      `${REACT_APP_SERVER_URL}/users/login`,
      { username, password },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.data;
    return data;
  }
);

export const loginUserSuccess = createAsyncThunk(
  "user/loginSuccess",
  async (accessToken) => {
    const response = await customAxios.post(
      `${REACT_APP_SERVER_URL}/users/loginSuccess`,
      { accessToken },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.data;
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("accessToken", action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        localStorage.removeItem("accessToken");
        state.accessToken = "";
        state.error = action.error.message;
        state.isAuthenticated = false;
      })
      .addCase(loginUserSuccess.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserSuccess.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(loginUserSuccess.rejected, (state, action) => {
        state.status = "failed";
        localStorage.removeItem("accessToken");
        state.accessToken = "";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
