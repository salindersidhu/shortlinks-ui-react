import React from "react";
import PropTypes from "prop-types";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URI
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function Apollo(props) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

Apollo.propTypes = {
  children: PropTypes.object
};

export default Apollo;
