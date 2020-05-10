import Permissions from "../components/Permissions";
import PleaseSignin from "../components/PleaseSignIn";

const PermissionsPage = (props) => (
  <PleaseSignin>
    <Permissions></Permissions>
  </PleaseSignin>
);

export default PermissionsPage;
