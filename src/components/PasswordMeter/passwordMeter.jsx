import React from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

import './passwordMeter.scss';

export default function PasswordMeter(props) {
    const score = props.value.length > 0 ? zxcvbn(props.value).score + 1 : 0;
    const scoreColors = ['red', 'red', 'orange', 'yellow', 'olive', 'blue'];
    return (
        <Progress
            percent={score * 20}
            color={scoreColors[score]}
            className='password-meter'
        />
    );
}

PasswordMeter.propTypes = {
    value: PropTypes.string
};
