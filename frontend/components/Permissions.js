import { Mutation, Query } from "react-apollo";

import { Component } from "react";
import Error from "./ErrorMessage";
import PropTypes from "prop-types";
import SickButton from "./styles/SickButton";
import Table from "./styles/Table";
import gql from "graphql-tag";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE",
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = (props) => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error}></Error>
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map((permission) => (
                  <th key={permission}>{permission}</th>
                ))}
                <th>👇🏻</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <UserPermissions key={user.id} user={user}></UserPermissions>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
);

class UserPermissions extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  };
  state = {
    permissions: this.props.user.permissions,
  };

  handlePermissionChange = ({ target: { checked, value } }) => {
    let updatedPermissions = [...this.state.permissions];
    if (checked) {
      updatedPermissions.push(value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        (permission) => permission !== value
      );
    }
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const { id, name, email } = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: id,
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="9">
                  <Error error={error}></Error>
                </td>
              </tr>
            )}
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              {possiblePermissions.map((permission) => (
                <td key={permission}>
                  <label htmlFor={`${id}-permission-${permission}`}>
                    <input
                      type="checkbox"
                      id={`${id}-permission-${permission}`}
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? "ing" : "e"}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
