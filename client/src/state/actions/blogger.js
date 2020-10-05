import { SET_BLOG, SEND_BLOGGER_DATA, SEND_MY_BLOGS, UPDATE_BLOGGER_DATA } from "../exports/index";
import axios from 'axios'


export const publicBloggs = (data) => {
  return {
    type: SEND_BLOGGER_DATA,
    payload: data
  }
};

export const updateBloggs = (data) => {
  return {
    type: UPDATE_BLOGGER_DATA,
    payload: data
  }
};


export const setMyBlog = (res) => {
  return {
    type: SEND_MY_BLOGS,
    payload: res
  }
}

export const setBlog = (data) => {
  return {
    type: SET_BLOG,
    payload: data
  }
}

export const setPublicBlogs = () => dispatch => {
  return axios.get('/blog/publicblogs')
    .then(res => {
      dispatch(publicBloggs(res.data));
    }).then(res => {
      return true
    }).catch(err => {
      return false
    })
}