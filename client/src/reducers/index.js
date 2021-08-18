import { combineReducers } from 'redux';
import {posts, postId} from './posts';

export default combineReducers({
  posts: posts,
  postId: postId
});
