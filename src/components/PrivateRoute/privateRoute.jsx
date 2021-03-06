import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../context/auth";

export default function PrivateRoute(props) {
  const { component: Component, rootPath, ...rest } = props;
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={rootPath} />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  rootPath: PropTypes.string.isRequired,
};
