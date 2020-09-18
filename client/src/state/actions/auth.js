import { INITIAL_LOGIN, AUTHENTICATED_LOGOUT_ACCESS, USER_DATA, ADMIN_AUTH } from "../exports/index";
import axios from 'axios'

export const setInitialLogin = () => {
  return {
    type: INITIAL_LOGIN,
  }
};

export const setAdmin = (data) => {
  return {
    type: ADMIN_AUTH,
    payload: data
  }
};

export const setLogoutUser = () => {
  return {
    type: AUTHENTICATED_LOGOUT_ACCESS
  };
};



export const setUserData = () => {
  return async (dispatch) => {
    let res = await axios.get('auth/userdata');
    if (res.data) {

      dispatch(setAdmin(res.data.admin))
      dispatch({
        type: USER_DATA,
        payload: res.data
      })
    } else {
      dispatch(setAdmin(false))
    }

  }
}