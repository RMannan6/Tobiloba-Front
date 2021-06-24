import { combineReducers } from "redux";
import { userReducer } from "./userReducer.js";
import { searchReducer } from "./searchReducer.js";
import { cartReducer } from "./cartReducer.js";
import { drawerReducer } from "./drawerReducer.js";
import { shippingReducer } from "./shippingReducer.js";
import { dealReducer } from "./dealReducer.js";
import { cashReducer } from "./cashReducer.js";
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  shipping: shippingReducer,
  deal: dealReducer,
  cash: cashReducer,
});

export default rootReducer;
