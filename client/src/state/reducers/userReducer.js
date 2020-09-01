import { AUTHENTICATED_LOGOUT_ACCESS, INITIAL_LOGIN } from "../exports/index";

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
        ...state,
        authenticated: state.authenticated = false
      }
    default: return state;
  }

}


export default reducer