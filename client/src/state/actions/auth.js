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

export const authenticatedLogin = () => {
  return async (dispatch) => {
    let res = await axios.get('auth/authlogin');
    console.log(res)
    if (res.data.session_status === true && res.data.admin === true) {
      dispatch(setInitialLogin())
      dispatch(setAdmin(true))
    }
    if (res.data.session_status === true && res.data.admin === false) {
      dispatch(setInitialLogin())
    }
  }
}
export const getUserData = () => {

  return async (dispatch) => {
    let res = await axios.get('auth/userdata');
    dispatch(setAdmin(res.data.admin))
    dispatch({
      type: USER_DATA,
      payload: res.data
    })
  }
}