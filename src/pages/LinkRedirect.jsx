import React, { Fragment } from 'react';
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
            let redirectURL = filteredLinks[0].longURL;
            // Append protocol to link if it doesn't exist
            if (!redirectURL.match(/^(http|https):\/\//i)) {
                redirectURL = `http://${redirectURL}`;
            }
            // Redirect using long URL
            window.location.replace(redirectURL);
        }
    }

    return (
        <Fragment>
            {
                loading ? (
                    <Loader
                        active
                        size='huge'
                        inline='centered'
                    />
                ) : (
                    <Container width={16} textAlign="center">
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
                            Either something went wrong or the page does not exist anymore.
                        </Header>
                        <Button
                            icon
                            secondary
                            labelPosition="left"
                        >
                            <Icon name="chevron left" /> HOME PAGE
                        </Button>
                    </Container>
                )
            }
        </Fragment>
    );
}

export default LinkRedirect;
