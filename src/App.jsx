import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ApolloSystem from './components/ApolloSystem';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LinkRedirect from './pages/LinkRedirect';

function App() {
    return (
        <ApolloSystem>
            <AuthProvider>
                <Router>
                    <Switch>
                        <PrivateRoute
                            exact
                            path='/'
                            rootPath='/login'
                            component={Dashboard}
                        />
                        <PublicRoute
                            exact
                            path='/login'
                            authPath='/'
                            component={Login}
                        />
                        <PublicRoute
                            exact
                            path='/signup'
                            authPath='/'
                            component={Signup}
                        />
                        <Route
                            exact
                            path='/:shortURL'
                            component={LinkRedirect}
                        />
                    </Switch>
                </Router>
            </AuthProvider>
        </ApolloSystem>
    );
}

export default App;
