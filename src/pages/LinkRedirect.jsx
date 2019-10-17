import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useParams } from 'react-router-dom';

const FETCH_PUBLIC_LINKS = gql`
    {
        getPublicLinks {
            longURL
            shortURL
        }
    }
`;

function LinkRedirect() {
    const { shortURL } = useParams();
    const { loading, data } = useQuery(FETCH_PUBLIC_LINKS);

    if (!loading) {
        // Extract all links from data
        const { getPublicLinks: links } = data;
        // Filter out an active link by short URL 
        const redirectURL = links.filter(
            link => link.shortURL === shortURL
        )[0].longURL;
        // Redirect using long URL
        window.location = redirectURL;
    }

    return (
        <Fragment></Fragment>
    );
}

export default LinkRedirect;
