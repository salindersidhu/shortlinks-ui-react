import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({
    uri: GRAPHQL_API
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

function Apollo({app: App}) {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default Apollo;
