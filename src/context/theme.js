import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/styles";

import { DarkTheme, LightTheme } from "../themes";

const CustomThemeContext = createContext({
  setTheme: null,
  currentTheme: "light",
});

function CustomThemeProvider(props) {
  const { children } = props;

  // Get current theme from localStorage
  const currentTheme = localStorage.getItem("appTheme") || "light";

  // State to hold selected theme
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve theme object by theme name
  const theme = themeName === "light" ? LightTheme : DarkTheme;

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    setTheme: setThemeName,
    currentTheme: themeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export { CustomThemeContext, CustomThemeProvider };
