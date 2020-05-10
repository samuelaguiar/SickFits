import { CURRENT_USER_QUERY } from "./User";
import { Query } from "react-apollo";
import Signin from "./Signin";

const PleaseSignin = ({ children }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin></Signin>
          </div>
        );
      } else {
        return children;
      }
    }}
  </Query>
);
export default PleaseSignin;
