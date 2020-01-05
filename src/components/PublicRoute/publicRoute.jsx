import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../context/auth";

export default function PublicRoute(props) {
  const { component: Component, authPath, ...rest } = props;
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Redirect to={authPath} /> : <Component {...props} />
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authPath: PropTypes.string.isRequired
};
