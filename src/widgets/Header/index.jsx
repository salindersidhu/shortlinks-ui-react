import React, { useState, useContext } from "react";

import clsx from "clsx";
import PropTypes from "prop-types";
import { useApolloClient } from "@apollo/react-hooks";

import {
  Menu,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon, MoreVert as MoreVertIcon } from "@material-ui/icons";

import { AuthContext } from "../../context/auth";

import useStyles from "./styles";

function Header(props) {
  const { isDrawerOpen, onOpenDrawer } = props;

  const classes = useStyles();
  const client = useApolloClient();
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleLogout = () => {
    client.resetStore();
    logout();
  };

  return (
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
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
};

export default Header;
