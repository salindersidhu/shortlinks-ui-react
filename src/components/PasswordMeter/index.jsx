import React from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

const passwordColorMap = value => {
    if (value <= 20) {
        return 'red';
    } else if (value <= 40) {
        return 'orange';
    } else if (value <= 80) {
        return 'yellow';
    }
    return 'olive';
};

function PasswordMeter({ value }) {
    const score = value.length > 0 ? (zxcvbn(value).score + 1) * 20 : 0;
    return (
        <Progress
            style={{ margin: '1em 0em' }}
            percent={score}
            color={passwordColorMap(score)}
        />
    );
}

PasswordMeter.propTypes = {
    value: PropTypes.string
};

export default PasswordMeter;
