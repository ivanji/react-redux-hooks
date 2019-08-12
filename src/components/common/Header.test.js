import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// Sort of searching through the JSX as the child components aren't mounted
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Sort of searching through the JSX as the child components aren't mounted
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

it("contains 3 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
});
