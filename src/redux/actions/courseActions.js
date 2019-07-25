import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// --- Thunks
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}
// --- end of Thunks

// Action creators
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course }; // object short-hand syntax
}
