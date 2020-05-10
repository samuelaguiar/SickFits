import ApolloClient from "apollo-boost";
import { LOCAL_STATE_QUERY } from "../components/Cart";
import { endpoint } from "../config";
import withApollo from "next-with-apollo";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            // write the cart State to the opposite
            const data = { cartOpen: !cartOpen };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
