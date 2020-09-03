import { combineReducers } from 'redux';

import userReducer from './userReducer'
import bloggerReducer from './bloggerReducer'

const rootReducer = combineReducers({
  userData: userReducer,
  bloggerData: bloggerReducer
});

export default rootReducer