import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import PleaseSignIn from "../components/PleaseSignIn";
import { fakeUser } from "../lib/testUtils";
import { mount } from "enzyme";
import wait from "waait";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

describe("<PleaseSignIn/>", () => {
  it("renders the sign in dialog to legged out users", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn></PleaseSignIn>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain("Please Sign In before Continuing");
    const SignIn = wrapper.find("Signin");
    expect(SignIn.exists()).toBe(true);
  });

  it("renders the children component when the user is signed in", async () => {
    const Hey = () => <p>Hey!</p>;
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <PleaseSignIn>
          <Hey></Hey>
        </PleaseSignIn>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.find("Hey").exists()).toBe(true);
    expect(wrapper.contains(<Hey></Hey>)).toBe(true);
  });
});
