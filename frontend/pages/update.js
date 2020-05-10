import React, { Component } from "react";

import UpdateItem from "../components/UpdateItem";

const Update = ({ query }) => <UpdateItem id={query.id}></UpdateItem>;

export default Update;
