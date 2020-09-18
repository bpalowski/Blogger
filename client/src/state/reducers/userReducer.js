import { AUTHENTICATED_LOGOUT_ACCESS, INITIAL_LOGIN, USER_DATA, ADMIN_AUTH } from "../exports/index";

const INITIAL_STATE = {
  admin: false,
  authenticated: false,
  userData: [],
  allUsers: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case INITIAL_LOGIN:
      return {
        ...state,
        authenticated: state.authenticated = true
      }
    case AUTHENTICATED_LOGOUT_ACCESS:
      return {
        admin: state.admin = false,
        authenticated: state.authenticated = false,
        userData: []
      }

    case USER_DATA:
      return {
        ...state,
        authenticated: state.authenticated = true,
        userData: action.payload
      }

    case ADMIN_AUTH:
      return {
        ...state,
        admin: action.payload
      }
    default: return state;
  }

}


export default reducer