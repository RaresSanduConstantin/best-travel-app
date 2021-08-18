import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  GET_POST_ID,
  DELETE_POST_ID
} from '../constants/actionTypes';

export const posts =   (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export const postId = (state = null, action) =>{
  switch (action.type) {
    case GET_POST_ID:
      return action.payload
    case DELETE_POST_ID:
      return action.payload;
    default:
      return state;
  }
}