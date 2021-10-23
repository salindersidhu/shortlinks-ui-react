import React from "react";
import { Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright \u00A9 "}
      <Link color="inherit" href="https://github.com/salindersidhu">
        Salinder Sidhu
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
