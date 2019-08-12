import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderCourseFrom(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseFrom();
  //console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseFrom();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save buttons as "Saving..." when saving', () => {
  const wrapper = renderCourseFrom({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving");
});
