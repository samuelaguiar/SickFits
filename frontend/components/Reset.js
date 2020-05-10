import React, { Component } from "react";

import { CURRENT_USER_QUERY } from "./User";
import Error from "./ErrorMessage";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import gql from "graphql-tag";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: "",
    confirmPassword: "",
  };

  saveToState = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              this.setState({ password: "", confirmPassword: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your password</h2>
              <Error error={error}></Error>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                ></input>
              </label>
              <label htmlFor="confirmPassword">
                Confirm your Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                ></input>
              </label>
              <button type="submit">Reset your password!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;
