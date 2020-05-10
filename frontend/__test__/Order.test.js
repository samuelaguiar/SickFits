import Order, { SINGLE_ORDER_QUERY } from "../components/Order";
import { fakeOrder, fakeOrderItem } from "../lib/testUtils";

import { MockedProvider } from "react-apollo/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: "ord123" } },
    result: { data: { order: fakeOrder() } },
  },
];

describe("<Order/>", () => {
  it("renders the order", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123"></Order>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const order = wrapper.find('div[data-test="order"]');
    expect(toJSON(order)).toMatchSnapshot();
  });
});
