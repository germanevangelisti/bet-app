import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  // add other reducers here if needed
});

export default rootReducer;
