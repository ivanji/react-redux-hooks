import { combineReducers } from "redux";

import courses from "./courseReducer"; // here the default export in courseReducer is referenced as 'courses' for simplicity
import authors from "./authorReducer";

const rootReducer = combineReducers({
  authors,
  courses
});

export default rootReducer;
