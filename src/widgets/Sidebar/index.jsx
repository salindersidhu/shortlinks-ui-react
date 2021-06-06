import React from "react";

import clsx from "clsx";
import PropTypes from "prop-types";

import {
  List,
  Drawer,
  Divider,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Dashboard as DashboardIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@material-ui/icons";

import useStyles from "./styles";

function Sidebar(props) {
  const { isDrawerOpen, onCloseDrawer } = props;

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isDrawerOpen && classes.drawerPaperClose
        ),
      }}
      open={isDrawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
};

export default Sidebar;
