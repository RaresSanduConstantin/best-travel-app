import * as api from '../api/index';
import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, GET_POST_ID, DELETE_POST_ID} from '../constants/actionTypes'

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id,post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    
    dispatch({ type: DELETE, payload: id });
    
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostId = (id) => async (dispatch) => {
  try {
   console.log(id)
    dispatch({ type: GET_POST_ID, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostId = () => async (dispatch) => {
  try {
  
    dispatch({ type: DELETE_POST_ID, payload: null });
  } catch (error) {
    console.log(error);
  }
};

