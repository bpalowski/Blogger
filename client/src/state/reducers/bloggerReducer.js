import { SEND_BLOGGER_DATA, SEND_MY_BLOGS } from "../exports/index";

const INITIAL_STATE = {
  publicBlogs: [],
  myBlogs: [],
  allBlogs: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SEND_BLOGGER_DATA:
      return {
        ...state,
        publicBlogs: [...state.publicBlogs, action.payload]
      }

    case SEND_MY_BLOGS:
      return {
        ...state,
        myBlogs: [...state.myBlogs, action.payload]
      }

    default: return state;
  }

}


export default reducer