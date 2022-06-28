import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client;

/* Get Apollo Client */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/* Create Apollo Client */
// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = process.env.BACKEND_URL || "http://localhost:1337/graphql";
export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri:  GRAPHQL_URL
    }),
    cache: new InMemoryCache(),
  });
}
