import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { useParams } from 'react-router-dom';
import { GET_PUBLIC_LINKS } from '../graphql';

function LinkRedirect() {
    const { shortURL } = useParams();
    const { loading, data } = useQuery(GET_PUBLIC_LINKS);

    if (!loading) {
        // Extract all links from data
        const { getPublicLinks: links } = data;
        // Filter out an active link by short URL 
        let redirectURL = links.filter(
            link => link.shortURL === shortURL
        )[0].longURL;
        // Append protocol to link if it doesn't exist
        if (!redirectURL.match(/^(http|https):\/\//i)) {
            redirectURL = `http://${redirectURL}`;
        }
        // Redirect using long URL
        window.location.replace(redirectURL);
    }

    return (
        <Fragment></Fragment>
    );
}

export default LinkRedirect;
