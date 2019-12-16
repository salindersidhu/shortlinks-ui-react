import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
    Grid,
    Loader,
    Header,
    Container
} from 'semantic-ui-react';

import './link.scss';
import { browserifyLink } from '../../utils';
import { GET_PUBLIC_LINKS } from '../../graphql';

export default function Link() {
    const { hash } = useParams();
    const [ url, setUrl ] = useState('');
    const { loading, data, error } = useQuery(GET_PUBLIC_LINKS);

    useEffect(() => {
        if (!loading && !error) {
            // Obtain link with matching hash
            const { getPublicLinks: links } = data;
            const link = links.filter(link => link.shortURL === hash)[0];
            // Browserify link and redirect
            if (link && link.longURL) {
                setUrl(browserifyLink(link.longURL));
                window.location.replace(url);
            }
        }
    }, [loading, error, data, hash, url]);

    function renderLoad() {
        return (
            <Loader active size='massive' inline='centered' />
        );
    }

    function render404() {
        return (
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
        );
    }

    return (
        <Container>
            <Grid verticalAlign='middle' className='link-grid'>
                <Grid.Column>
                    {
                        loading ? renderLoad() : url ? renderLoad() : render404()
                    }
                </Grid.Column>
            </Grid>
        </Container>
    );
}
