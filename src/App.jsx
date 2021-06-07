import React from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import Apollo from "./graphql/Apollo";
import { AuthProvider } from "./context/auth";
import { CustomThemeProvider } from "./context/theme";

import { SignUp, SignIn, Dashboard } from "./pages";
import { PublicRoute, PrivateRoute } from "./components";

function App() {
  return (
    <CustomThemeProvider>
      <Apollo>
        <AuthProvider>
          <Router>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                rootPath="/signin"
                component={Dashboard}
              />
              <PublicRoute
                exact
                path="/signin"
                authPath="/"
                component={SignIn}
              />
              <PublicRoute
                exact
                path="/signup"
                authPath="/"
                component={SignUp}
              />
            </Switch>
          </Router>
        </AuthProvider>
      </Apollo>
    </CustomThemeProvider>
  );
}

export default App;
