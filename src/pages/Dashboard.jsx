import React, { Fragment } from 'react';

import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';

function Dashboard() {
    return (
        <Fragment>
            <ShortLinksHeader />
            <ShortLinksFooter />
        </Fragment>
    );
}

export default Dashboard;
