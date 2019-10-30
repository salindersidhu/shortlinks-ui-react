import React from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

function scoreToColor(value) {
    if (value <= 20) {
        return 'red';
    } else if (value <= 40) {
        return 'orange';
    } else if (value <= 60) {
        return 'yellow';
    } else if (value <= 80) {
        return 'olive';
    }
    return 'green';
}

function PasswordMeter({ value }) {
    const score = value.length > 0 ? (zxcvbn(value).score + 1) * 20 : 0;
    return <Progress
        percent={score}
        label='Password Strength'
        color={scoreToColor(score)}
    />;
}

PasswordMeter.propTypes = {
    value: PropTypes.string
};

export default PasswordMeter;
