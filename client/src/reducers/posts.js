import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  GET_POST_ID,
  DELETE_POST_ID,
  FETCH_BY_SEARCH,
  FETCH_POST,
  START_LOADIN,
  END_LOADING,
  USER_POSTS,
  FETCH_BY_CREATOR
} from '../constants/actionTypes';

export const posts = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADIN:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case FETCH_BY_CREATOR:
      return {
        ...state,
        posts: action.payload.data
      }
    default:
      return state;
  }
};

export const postId = (state = null, action) => {
  switch (action.type) {
    case GET_POST_ID:
      return action.payload;
    case DELETE_POST_ID:
      return action.payload;
    default:
      return state;
  }
};
