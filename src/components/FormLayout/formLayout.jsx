import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Header } from 'semantic-ui-react';

import './formLayout.scss';

export default function FormLayout(props) {
    return (
        <Grid verticalAlign='middle' className='pf-grid' centered>
            <Grid.Column className='pf-col'>
                <Image src={props.logo} size='tiny' centered/>
                <Header as='h1' color='black' className='pf-heading'>
                    {props.heading}
                </Header>
                {props.children}
            </Grid.Column>
        </Grid>
    );
}

FormLayout.propTypes = {
    children: PropTypes.array,
    logo: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired
};
