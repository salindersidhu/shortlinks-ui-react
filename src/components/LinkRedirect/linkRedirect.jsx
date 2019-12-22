import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import {
    Grid,
    Loader,
    Container
} from 'semantic-ui-react';

import './linkRedirect.scss';
import { NotFound } from '../';
import { browserifyLink } from '../../utils';
import { GET_PUBLIC_LINKS } from '../../graphql';

export default function LinkRedirect() {
    const { hash } = useParams();
    const [url, setUrl] = useState('');
    const { loading, data, error } = useQuery(GET_PUBLIC_LINKS);

    useEffect(() => {
        if (!loading && !error) {
            // Obtain link with matching hash
            const { getPublicLinks: links } = data;
            const link = links.filter(link => link.hash === hash)[0];
            // Browserify link and redirect
            console.log(link);
            if (link && link.url) {
                setUrl(browserifyLink(link.url));
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
            <NotFound/>
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
