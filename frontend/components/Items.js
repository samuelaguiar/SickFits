import React, { Component } from "react";

import Item from "./Item";
import Pagination from "./Pagination";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../config";
import styled from "styled-components";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEM_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page}></Pagination>
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <ItemsList>
                {data.items.map((item, i) => (
                  <Item item={item} key={item.id}></Item>
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={page}></Pagination>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
