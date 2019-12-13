import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Apollo from './graphql/Apollo';
import { AuthProvider } from './context/auth';
import { PublicRoute, PrivateRoute } from './components';
import { Signup, Signin, Dashboard, Redirect } from './pages';

function App() {
    return <Apollo>
        <AuthProvider>
            <Router>
                <Switch>
                    <PrivateRoute
                        exact
                        path='/'
                        rootPath='/signin'
                        component={Dashboard}
                    />
                    <PublicRoute
                        exact
                        path='/signin'
                        authPath='/'
                        component={Signin}
                    />
                    <PublicRoute
                        exact
                        path='/signup'
                        authPath='/'
                        component={Signup}
                    />
                    <Route
                        exact
                        path='/:hash'
                        component={Redirect}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    </Apollo>;
}

export default App;
