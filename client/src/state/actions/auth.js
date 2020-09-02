import { INITIAL_LOGIN, AUTHENTICATED_LOGOUT_ACCESS, USER_DATA } from "../exports/index";
import axios from 'axios'

export const setInitialLogin = () => {
  return {
    type: INITIAL_LOGIN,
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
    if (res.data.session_status === true) {
      dispatch(setInitialLogin())
    }
  }
}


export const getUserData = () => {
  // console.log("hello")
  return async (dispatch) => {
    let res = await axios.get('auth/userdata');
    dispatch({
      type: USER_DATA,
      payload: res.data
    })
  }
}