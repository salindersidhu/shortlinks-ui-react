import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/auth";

function PrivateRoute(props) {
  const { rootPath } = props;
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to={rootPath} />;
}

PrivateRoute.propTypes = {
  rootPath: PropTypes.string.isRequired,
};

export default PrivateRoute;
