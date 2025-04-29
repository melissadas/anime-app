import { ApolloClient, InMemoryCache } from "@apollo/client/core"

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
})
