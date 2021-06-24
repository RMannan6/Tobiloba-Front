let initialState = [];
export const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};
