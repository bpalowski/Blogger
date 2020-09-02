import { AUTHENTICATED_LOGOUT_ACCESS, INITIAL_LOGIN, USER_DATA } from "../exports/index";

const INITIAL_STATE = {
  authenticated: false,
  userData: [],
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
        authenticated: state.authenticated = false,
        userData: []
      }

    case USER_DATA:
      return {
        ...state,
        authenticated: state.authenticated = true,
        userData: [...state.userData, action.payload]
      }
    default: return state;
  }

}


export default reducer