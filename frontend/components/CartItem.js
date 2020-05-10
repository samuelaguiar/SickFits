import PropTypes from "prop-types";
import React from "react";
import RemoveFromCart from "./RemoveFromCart";
import formatMoney from "../lib/formatMoney";
import styled from "styled-components";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem: { id, quantity, item } }) => {
  // check if that item exists
  if (!item)
    return (
      <CartItemStyles>
        <p>This Item has been removed</p>
        <RemoveFromCart id={id}></RemoveFromCart>
      </CartItemStyles>
    );

  return (
    <CartItemStyles>
      <img width="100" src={item.image} alt={item.title}></img>
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney(item.price * quantity)}
          {" - "}
          <em>
            {quantity} &times; {formatMoney(item.price)}
          </em>{" "}
          each
        </p>
      </div>
      <RemoveFromCart id={id}></RemoveFromCart>
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CartItem;
