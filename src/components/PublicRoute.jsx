import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/auth";

function PublicRoute(props) {
  const { authPath } = props;
  const { user } = useContext(AuthContext);

  return user ? <Navigate to={authPath} /> : <Outlet />;
}

PublicRoute.propTypes = {
  authPath: PropTypes.string.isRequired,
};

export default PublicRoute;
