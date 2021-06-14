import React from "react";

import PropTypes from "prop-types";

import { Toolbar, Tooltip, IconButton, Typography } from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import useStyles from "./styles";

function CustomTableToolbar(props) {
  const { title } = props;

  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

CustomTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CustomTableToolbar;
