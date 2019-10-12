import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

function PublicRoute({ component: Component, authPath, ...rest }) {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Redirect to={authPath} /> : <Component {...props} />
            }
        />
    );
}

PublicRoute.propTypes = {
    authPath: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired
};

export default PublicRoute;
