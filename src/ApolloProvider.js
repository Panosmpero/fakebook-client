import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ENDPOINT } from "./config";
import { setContext } from "apollo-link-context";

// Apollo boilerplate
const httpLink = createHttpLink({
  uri: ENDPOINT,
});

// middleware - set header in order to create posts
// https://www.apollographql.com/docs/react/api/link/apollo-link-context/
// =======================================================================
const authLink = setContext((req, pre) => {
  const token = localStorage.getItem("fakebook-token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default client;
