import { combineReducers } from "redux";

import courses from "./courseReducer"; // here the default export in courseReducer is referenced as 'courses' for simplicity
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  authors,
  courses,
  apiCallsInProgress
});

export default rootReducer;
