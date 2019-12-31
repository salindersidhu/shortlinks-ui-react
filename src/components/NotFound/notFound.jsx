import React from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';

import './notFound.scss';

export default function Link() {
    return (
        <Container>
            <Grid verticalAlign='middle' className='link-grid'>
                <Grid.Column>
                    <Container width={16} textAlign='center'>
                        <Header as='h1' className='mb-0 link-heading'>
                            404
                        </Header>
                        <Header size='huge' className='mt-0'>
                            PAGE NOT FOUND
                        </Header>
                        <Header disabled size='medium' className='mt-0'>
                            Either something went wrong or the page does not exist
                        </Header>
                    </Container>
                </Grid.Column>
            </Grid>
        </Container>
    );
}
