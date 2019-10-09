import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
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
            </Router>
        </AuthProvider>
    )
}

export default App;
