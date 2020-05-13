const currentUser = (
  state = { details: { firstName: "", lastName: "" } },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        details: action.payload,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        details: {},
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default currentUser;
