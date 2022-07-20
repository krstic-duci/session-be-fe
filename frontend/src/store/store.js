import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers/root";

const store = (preloadedState) =>
  createStore(reducer, preloadedState, applyMiddleware(thunk));

export default store;
