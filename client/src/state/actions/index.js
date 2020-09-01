import { INITIAL_LOGIN, AUTHENTICATED_LOGOUT_ACCESS } from "../exports/index";
import axios from 'axios'
//User

export const setInitialLogin = () => {
  return {
    type: INITIAL_LOGIN,
  }
};

export const setLogut = () => {
  return {
    type: AUTHENTICATED_LOGOUT_ACCESS
  };
};

export const authenticatedLogin = () => {
  return async (dispatch) => {
    let res = await axios.get('auth/authlogin');
    if (res.data.session_status === true) {
      dispatch(setInitialLogin())
    }
  }
}
