import { combineReducers } from "redux";

import courses from "./courseReducer"; // here the default export in courseReducer is referenced as 'courses' for simplicity

const rootReducer = combineReducers({
  courses
});

export default rootReducer;
