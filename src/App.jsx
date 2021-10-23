import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Apollo from "./graphql/Apollo";
import { AuthProvider } from "./context/auth";
import { CustomThemeProvider } from "./context/theme";
import { Dashboard, SignIn, SignUp } from "./pages";
import { PrivateRoute, PublicRoute } from "./components";

function App() {
  return (
    <CustomThemeProvider>
      <Apollo>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={<PrivateRoute rootPath="/signin" />}
              >
                <Route exact path="/" element={<Dashboard />} />
              </Route>
              <Route
                exact
                path="/signin"
                element={<PublicRoute authPath="/" />}
              >
                <Route exact path="/signin" element={<SignIn />} />
              </Route>
              <Route
                exact
                path="/signup"
                element={<PublicRoute authPath="/" />}
              >
                <Route exact path="/signup" element={<SignUp />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </Apollo>
    </CustomThemeProvider>
  );
}

export default App;
