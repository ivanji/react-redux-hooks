import React from "react";
import { mount } from "enzyme";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
  const defaultProps = {
    authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />);
  /**
   * When testing with redux we have two options:
   * 1. wrapping the tested component in a <Provider> component
   *    (and making the necessary imports, store and instanciating it)
   * 2. Export plain unconnected component
   *    Just add export to the component, keeping the default export as the connected component
   */

  //return mount(<Provider store={store}><ManageCoursePage {...props} />);</Provider>
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required!.");
});
