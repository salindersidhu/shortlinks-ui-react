import React from "react";
import PropTypes from "prop-types";
import { lighten } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

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
