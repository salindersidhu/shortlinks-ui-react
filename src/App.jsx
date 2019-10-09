import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css'

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PublicRoute exact path='/login' component={Login} />
                <PublicRoute exact path='/signup' component={Signup} />
            </Router>
        </AuthProvider>
    )
}

export default App;
