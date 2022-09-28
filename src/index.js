import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

const AppBar = lazy(() => import("./components/appBar/index.js"));
const Home = lazy(() => import("./components/home/index.js"));
const Dashboard = lazy(() => import("./components/dashboard/index.js"));
const Teams = lazy(() => import("./components/teams/index.js"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <AppBar />
        <Switch>
          <Route exact path={["/home", "/"]} component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/teams" component={Teams} /> 
        </Switch>
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
