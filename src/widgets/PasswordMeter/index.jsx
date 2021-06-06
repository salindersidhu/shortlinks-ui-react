import React, { useEffect, useState } from "react";

import zxcvbn from "zxcvbn";
import PropTypes from "prop-types";

import { Box, Typography, LinearProgress } from "@material-ui/core";

function PasswordMeter(props) {
  const { password, description } = props;

  const [score, setScore] = useState(0);

  useEffect(() => {
    let score =
      password && password.length > 0 ? zxcvbn(password).score + 1 : 0;
    setScore(score);
  }, [password]);

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={score * 20} />
      </Box>
      <Box minWidth={45}>
        <Typography variant="body2" color="textSecondary">
          {description[score < 1 ? 0 : score - 1]}
        </Typography>
      </Box>
    </Box>
  );
}

PasswordMeter.defaultProps = {
  description: ["Poor", "Weak", "Fair", "Good", "Strong"],
};

PasswordMeter.propTypes = {
  password: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string),
};

export default PasswordMeter;
