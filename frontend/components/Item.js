import React, { Component } from "react";

import AddToCart from "./AddToCart";
import DeleteItem from "./DeleteItem";
import ItemStyles from "./styles/ItemStyles";
import Link from "next/link";
import PriceTag from "./styles/PriceTag";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import formatMoney from "../lib/formatMoney";

class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: "./item",
              query: { id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: { id: item.id },
            }}
          >
            <a>Edit ✏</a>
          </Link>
          <AddToCart id={item.id}></AddToCart>
          <DeleteItem id={item.id}>Delete this item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
