import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

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
  return render(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const { getByText } = renderCourseFrom();
  getByText("Add Course"); //assertion is built-in
});

it('labels save buttons as "Save" when not saving', () => {
  const { getByText } = renderCourseFrom();
  getByText("Save");
});

it('labels save buttons as "Saving..." when saving', () => {
  const { getByText } = renderCourseFrom({ saving: true });
  //debug();
  getByText("Saving");
});
