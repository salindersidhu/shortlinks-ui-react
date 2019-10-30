import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Grid,
    Loader,
    Header,
    Container
} from 'semantic-ui-react';

import { browserifyLink } from '../utils';
import { useParams } from 'react-router-dom';
import { GET_PUBLIC_LINKS } from '../graphql';

function LinkRedirect() {
    const { shortURL } = useParams();
    const [ state, setState ] = useState({});
    const { loading, data } = useQuery(GET_PUBLIC_LINKS);

    if (!loading) {
        // Extract all links from data
        const { getPublicLinks: links } = data;
        // Filter out an active link by short URL 
        const filteredLinks = links.filter(
            link => link.shortURL === shortURL
        );
        // Check that filteredLinks returned results
        if (filteredLinks.length > 0) {
            const longURL = browserifyLink(filteredLinks[0].longURL);
            // Add Long URL to state
            if (!state.longURL) {
                setState({ longURL });
            }
            // Redirect using long URL
            window.location.replace(state.longURL);
        }
    }

    function renderLoader() {
        return <Loader active size='massive' inline='centered'/>;
    }

    function render404() {
        return <Container width={16} textAlign='center'>
            <Header as='h1' style={{ fontSize: '10em', marginBottom: 0 }}>
                404
            </Header>
            <Header size='huge' style={{ marginTop: 0 }}>
                PAGE NOT FOUND
            </Header>
            <Header disabled size='medium' style={{ marginTop: 0 }}>
                Either something went wrong or the page does not exist
            </Header>
        </Container>;
    }

    return <Grid verticalAlign='middle' style={{ height: '100vh' }}>
        <Grid.Column>
            {
                loading ? renderLoader() : state.longURL ? renderLoader() : render404()
            }
        </Grid.Column>
    </Grid>;
}

export default LinkRedirect;
