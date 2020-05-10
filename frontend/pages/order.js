import Order from "../components/Order";
import PleaseSignin from "../components/PleaseSignIn";

const OrderPage = ({ query }) => (
  <PleaseSignin>
    <Order id={query.id}></Order>
  </PleaseSignin>
);

export default OrderPage;
