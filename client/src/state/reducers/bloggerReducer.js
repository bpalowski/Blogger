import { SET_BLOG, SEND_BLOGGER_DATA, SEND_MY_BLOGS, UPDATE_BLOGGER_DATA } from "../exports/index";

const INITIAL_STATE = {
  publicBlogs: [],
  currentBlog: [],
  myBlogs: [],
  allBlogs: [],
  updateBlog: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SEND_BLOGGER_DATA:

      return {
        ...state,
        publicBlogs: action.payload
      }

    case SEND_MY_BLOGS:
      return {
        ...state,
        myBlogs: action.payload
      }
    case SET_BLOG:
      return {
        ...state,
        currentBlog: action.payload
      }

    case UPDATE_BLOGGER_DATA:
      return {
        ...state,
        updateBlog: action.payload
      }
    default: return state;
  }

}


export default reducer