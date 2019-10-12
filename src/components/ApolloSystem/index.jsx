import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
    /* eslint-disable */
    uri: GRAPHQL_API
    /* eslint-enable */
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

function ApolloSystem(props) {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    );
}

ApolloSystem.propTypes = {
    children: PropTypes.object
};

export default ApolloSystem;
