import { SEND_BLOGGER_DATA, SEND_MY_BLOGS } from "../exports/index";
// import axios from 'axios'

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


export const setMyBlog = (res) => {
  console.log(res)
  return {
    type: SEND_MY_BLOGS,
    payload: res
  }
}