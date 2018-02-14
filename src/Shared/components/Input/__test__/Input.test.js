import React from "react";
import { shallow } from "enzyme";

import Input from "../Input";

describe("Input Component", () => {
  const setup = propsOverride => {
    const props = {
      onChange: jest.fn(),
      label: "test",
      value: "value",
      ...propsOverride
    };

    const wrapper = shallow(<Input {...props} />);

    return {
      props: wrapper.props(),
      wrapper
    };
  };

  it("should render without loading", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with loading", () => {
    const { wrapper } = setup({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });
});
