import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io/"
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <h1>Shortlinks App</h1>
                </div>
            </ApolloProvider>
        )
    }
}

export default App;
