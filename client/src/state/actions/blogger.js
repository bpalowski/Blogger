import { SEND_BLOGGER_DATA } from "../exports/index";
import axios from 'axios'

export const publicBloggs = (data) => {
  return {
    type: SEND_BLOGGER_DATA,
    payload: data
  }
};

// export const blogSubmitForm = async (data) => {
//   const { title, bodyText } = data;
//   await axios.post('blog/createblog', {
//     title,
//     bodyText
//   })
// }


// export const setMyBlog = () => {
//   // console.log("hello")
//   return async (dispatch) => {
//     let res = await axios.get('auth/userdata');
//     dispatch({
//       type: SEND_BLOGGER_DATA,
//       payload: res.data
//     })
//   }
// }