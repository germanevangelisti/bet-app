import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

const AppBar = lazy(() => import("./components/appBar/index.js"));
const Home = lazy(() => import("./pages/home/index.js"));
const BetSimulator = lazy(() => import("./pages/betSimulator/index.js"));
const Teams = lazy(() => import("./pages/teams/index.js"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <AppBar />
        <Switch>
          <Route exact path={["/home", "/"]} component={Home} />
          <Route path="/betSimulator" component={BetSimulator} />
          <Route path="/teams" component={Teams} /> 
        </Switch>
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
