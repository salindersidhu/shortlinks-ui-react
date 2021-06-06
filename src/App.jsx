import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Apollo from "./graphql/Apollo";
import { AuthProvider } from "./context/auth";

import { SignUp, SignIn, Dashboard } from "./pages";
import { PublicRoute, PrivateRoute } from "./components";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#2196F3",
      },
      secondary: {
        main: "#F50057",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
