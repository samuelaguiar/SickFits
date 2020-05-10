import { ApolloLink, Observable } from "apollo-link";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { LOCAL_STATE_QUERY } from "../components/Cart";
import { endpoint } from "../config";
import { onError } from "apollo-link-error";
import withApollo from "next-with-apollo";
import { withClientState } from "apollo-link-state";

function createClient({ headers }) {
  const cache = new InMemoryCache();

  const request = async (operation, header) => {
    operation.setContext({
      fetchOptions: {
        credentials: "include",
      },
      headers,
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle;
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          // sendToLoggingService(graphQLErrors);
        }
        if (networkError) {
          // logoutUser();
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          cartOpen: false,
        },
        resolvers: {
          Mutation: {
            toggleCart(_, variables, { cache }) {
              // read the cartOpen value from the cache
              const { cartOpen } = cache.readQuery({
                query: LOCAL_STATE_QUERY,
              });
              // write the cart State to the opposite
              const data = { cartOpen: !cartOpen };
              cache.writeData({ data });
              return data;
            },
          },
        },
        cache,
      }),
      new HttpLink({
        uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
      }),
    ]),
    cache,
  });
}

export default withApollo(createClient);
