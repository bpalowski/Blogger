import { SEND_BLOGGER_DATA } from "../exports/index";

const INITIAL_STATE = {
  bloggerData: [],
  allBlogs: []
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SEND_BLOGGER_DATA:
      return {
        ...state,
        bloggerData: [...state.bloggerData, action.payload]
      }

    default: return state;
  }

}


export default reducer