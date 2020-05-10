import RequestReset, {
  REQUEST_RESET_MUTATION,
} from "../components/RequestReset";

import { MockedProvider } from "react-apollo/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "sam@gmail.com" },
    },
    result: {
      data: {
        requestReset: {
          __typename: "Message",
          message: "success",
        },
      },
    },
  },
];

describe("<RequestReset/>", () => {
  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset></RequestReset>
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("calls the mutation", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RequestReset></RequestReset>
      </MockedProvider>
    );
    // simulate typing an email
    wrapper.find("input").simulate("change", {
      target: { name: "email", value: "sam@gmail.com" },
    });
    // submit the form
    wrapper.find("form").simulate("submit");
    await wait();
    wrapper.update();
    expect(wrapper.find("p").text()).toContain(
      "Success! Check your email for a reset link!"
    );
  });
});
