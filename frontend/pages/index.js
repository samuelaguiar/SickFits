import Items from "../components/Items";
import React from "react";

const Home = ({ query }) => (
  <div>
    <Items page={parseFloat(query.page) || 1}></Items>
  </div>
);

export default Home;
