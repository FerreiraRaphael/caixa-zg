import React from "react";
import { shallow, mount } from "enzyme";

import SearchProductInput from "../SearchProductInput";

describe("SearchProductInput Component", () => {
  const setup = (propsOverride = {}, mounting = false) => {
    const props = {
      fetchProducts: jest.fn(),
      ...propsOverride
    };

    const mountFunction = mounting ? mount : shallow;

    const wrapper = mountFunction(<SearchProductInput {...props} />);

    return {
      props: wrapper.props(),
      wrapper,
      input: wrapper.find("input")
    };
  };

  it("should render", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("should call fetchProducts on change", () => {
    const { wrapper, input, props } = setup(null, true);
    input.simulate("change", { target: { value: "query" } });
    expect(props.fetchProducts).toBeCalledWith({ query: "query" });
  });
});
