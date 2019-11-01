import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { resolvers,typeDefs } from "./resolvers"


const link = createUploadLink({ uri: "http://localhost:4000/graphql" });

export const client = new ApolloClient({
  link,
  typeDefs,
  resolvers,
  cache: new InMemoryCache()
});