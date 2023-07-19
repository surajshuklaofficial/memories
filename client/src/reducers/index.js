import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';

export default combineReducers({ posts, auth })  // here we can use all the individual reducers we have; for now we have only one posts


// posts: posts ---> posts ; if key and values are same we can only keep the first one