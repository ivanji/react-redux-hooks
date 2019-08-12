import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// --- Thunks
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
// --- end of Thunks

// Action creators
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}
