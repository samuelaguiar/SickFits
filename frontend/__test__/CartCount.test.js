import { mount, shallow } from "enzyme";

import CartCountComponent from "../components/CartCount";
import toJSON from "enzyme-to-json";

describe("<CartCount/>", () => {
  it("renders", () => {
    shallow(<CartCountComponent count={10}></CartCountComponent>);
  });

  it("matches the snapshot", () => {
    const wrapper = shallow(
      <CartCountComponent count={10}></CartCountComponent>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("updates via props", () => {
    const wrapper = shallow(
      <CartCountComponent count={50}></CartCountComponent>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
