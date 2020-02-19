import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import quoteReducer from "./quoteReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  quotes: quoteReducer
});
