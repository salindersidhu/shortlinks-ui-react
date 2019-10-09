import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function PrivateRoute({ component: Component, rootPath, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        <Route
            { ...rest }
            render={(props) =>
                user ? <Component { ...props } /> : <Redirect to={ rootPath }/>   
            }
        />
    );
}

export default PrivateRoute;
