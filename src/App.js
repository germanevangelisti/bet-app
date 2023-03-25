import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  selectStatus,
  loginUserSuccess,
  selectIsAuthenticated,
} from "./redux/slices/userSlice";
import { PrivateRoute, NotFound } from "./utils/authHelper";

import "./App.css";

const AppBar = lazy(() => import("./components/appBar/index.js"));
const Home = lazy(() => import("./pages/home/index.js"));
const BetSimulator = lazy(() => import("./pages/betSimulator/index.js"));
// const Teams = lazy(() => import("./pages/teams/index.js"));
const Login = lazy(() => import("./pages/login/index.js"));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(loginUserSuccess(accessToken));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/"
            component={Home}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            exact
            path="/betsimulator"
            component={BetSimulator}
            isAuthenticated={isAuthenticated}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
