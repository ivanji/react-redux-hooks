import * as actions from "../actions/courseActions";
import courseReducer from "./courseReducer";
import { exportAllDeclaration } from "@babel/types";

it("should add course when passed create_course_success", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const course = { id: 2, title: "New Title" };
  const action = actions.updateCourseSuccess(course);

  // act
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find(a => a.id == course.id);
  const untouchedCourse = newState.find(a => a.id == 1);

  expect(updatedCourse.title).toEqual("New Title");
  expect(untouchedCourse.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
