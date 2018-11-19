import { createStore, combineReducers, applyMiddleware } from "redux";
import bookList from "./bookList";
import selectedBook from "./selectedBook";
import * as promiseMiddleware from "redux-promise";

export default createStore(
  combineReducers({ bookList, selectedBook }),
  applyMiddleware(promiseMiddleware)
);
