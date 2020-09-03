import { SEND_BLOGGER_DATA } from "../exports/index";
import axios from 'axios'

export const setBlog = () => {
  return {
    type: SEND_BLOGGER_DATA,
  }
};

export const blogSubmitForm = (data) => {
  const { title, bodyText } = data
  return async (dispatch) => {
    await axios.post('blog/createblog', {
      title,
      bodyText
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }
}


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