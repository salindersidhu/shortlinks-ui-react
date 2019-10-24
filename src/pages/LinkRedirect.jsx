import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Icon,
    Loader,
    Button,
    Header,
    Container
} from 'semantic-ui-react';

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
            let longURL = filteredLinks[0].longURL;
            // Append protocol to Long URL if it doesn't exist
            if (!longURL.match(/^(http|https):\/\//i)) {
                longURL = `http://${longURL}`;
            }
            // Add Long URL to state
            if (!state.longURL) {
                setState({ longURL });
            }
            // Redirect using long URL
            window.location.replace(state.longURL);
        }
    }

    function renderLoader() {
        return (
            <Loader
                active
                size='huge'
                inline='centered'
            />
        );
    }

    function render404Page() {
        return (
            <Container
                width={16}
                textAlign='center'
            >
                <Header
                    as='h1'
                    style={{ fontSize: '10em', marginBottom: 0 }}
                >
                    404
                </Header>
                <Header
                    size='huge'
                    style={{ marginTop: 0 }}
                >
                    PAGE NOT FOUND!
                </Header>
                <Header
                    disabled
                    size='medium'
                    style={{ marginTop: 0 }}
                >
                    Either something went wrong or the page does not exist.
                </Header>
                <Button
                    icon
                    secondary
                    labelPosition='left'
                >
                    <Icon name='chevron left' /> HOME PAGE
                </Button>
            </Container>
        );

    }

    return loading ? renderLoader() : state.longURL ? renderLoader() : render404Page();
}

export default LinkRedirect;
