import React from "react";
import PropTypes from "prop-types";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URI,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Apollo(props) {
  const { children } = props;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

Apollo.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Apollo;
