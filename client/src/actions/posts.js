import * as api from '../api/index';
import {CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, GET_POST_ID, DELETE_POST_ID, FETCH_BY_SEARCH, START_LOADIN, END_LOADING, FETCH_BY_CREATOR, FETCH_POST} from '../constants/actionTypes'

// Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
 
    dispatch({type: START_LOADIN})
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({type: END_LOADING})

  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADIN });

    const { data } = await api.fetchPost(id);
    console.log('action',data)
    dispatch({ type: FETCH_POST, payload: { post: data } });
    dispatch({type: END_LOADING})

  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({type:START_LOADIN})
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({type: END_LOADING})

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
    dispatch({type:START_LOADIN})
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const getPostId = (id) => async (dispatch) => {
  try {  
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

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  console.log('actiuni', searchQuery)
  try {
    dispatch({ type: START_LOADIN });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPersonalPostsByCreator = (creator) => async (dispatch) => {
  
  try {
    dispatch({type:START_LOADIN})
    const {data} = await api.fetchPersonalPosts(creator);
  
    dispatch({ type: FETCH_BY_CREATOR, payload: {data} });
  
    dispatch({type: END_LOADING})

  } catch (error) {
    console.log(error);
  }
};


