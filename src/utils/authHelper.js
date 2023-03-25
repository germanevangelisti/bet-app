import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const NotFound = () => (
  <div>
    <h2>404 - Page not found</h2>
    <p>The requested page could not be found.</p>
  </div>
);

export { PrivateRoute, NotFound };
