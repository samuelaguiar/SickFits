import OrderList from "../components/OrderList";
import PleaseSignin from "../components/PleaseSignIn";

const OrdersPage = () => (
  <PleaseSignin>
    <OrderList></OrderList>
  </PleaseSignin>
);

export default OrdersPage;
