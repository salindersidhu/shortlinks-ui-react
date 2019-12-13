import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { PageHeader, PageFooter } from '../../components';

export default function PageLayoutStandard(props) {
    return (
        <Fragment>
            <PageHeader />
            {props.children}
            <PageFooter />
        </Fragment>
    );
}

PageLayoutStandard.propTypes = {
    children: PropTypes.object
};
