export const dealReducer = (state = false, action) => {
  switch (action.type) {
    case "DEAL_APPLIED":
      return action.payload;
    default:
      return state;
  }
};
