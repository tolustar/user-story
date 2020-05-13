const loginUser = (user) => {
  return {
      type: "LOGIN",
      payload: user
  }
}

const logoutUser = () => {
  return {
      type: "LOGOUT"
  }
}

export default {
  loginUser,
  logoutUser
}