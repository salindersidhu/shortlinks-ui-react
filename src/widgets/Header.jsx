import React, { useState, useContext } from "react";
import clsx from "clsx";
import GitInfo from "react-git-info/macro";
import moment from "moment";
import PropTypes from "prop-types";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  BrightnessHigh as BrightnessHighIcon,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useApolloClient } from "@apollo/react-hooks";

import { Alert } from ".";
import { AuthContext } from "../context/auth";
import { CustomThemeContext } from "../context/theme";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const { isDrawerOpen, onOpenDrawer } = props;

  const gitInfo = GitInfo();
  const classes = useStyles();
  const client = useApolloClient();
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const { currentTheme, setTheme } = useContext(CustomThemeContext);

  const handleMenuClose = () => setAnchorEl(null);

  const onCloseAlert = () => setAlertVisible(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const toggleTheme = () =>
    setTheme(currentTheme === "light" ? "dark" : "light");

  const handleLogout = () => {
    client.resetStore();
    logout();
  };

  const handleAbout = () => {
    setAlertVisible(true);
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenDrawer}
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Tooltip
            title="Toggle light/dark theme"
            aria-label="Toggle light or dark theme"
          >
            <IconButton color="inherit" onClick={toggleTheme}>
              {currentTheme === "light" ? (
                <Brightness4Icon />
              ) : (
                <BrightnessHighIcon />
              )}
            </IconButton>
          </Tooltip>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAbout}>About</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Alert
        visible={alertVisible}
        onClose={onCloseAlert}
        title="About"
        description={`Shortlinks Build: ${gitInfo.commit.shortHash} (${moment(
          gitInfo.commit.date
        ).format("MMM DD, YYYY")})`}
      ></Alert>
    </>
  );
}

Header.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
};

export default Header;
