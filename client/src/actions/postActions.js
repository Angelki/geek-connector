import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  SET_CURRENT_PAGE,
  SET_CURRENT_DATA,
  GET_CATEGORY,
  EDIT_CATEGORY,
  ADMIN_DELETE_POST
} from "./types";

// 发帖
export const addPost = (postData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : ""
      })
    );
};

// 获取帖子列表
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// 获取分类列表
export const getCategory = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/admin/category")
    .then(res =>
      dispatch({
        type: GET_CATEGORY,
        payload: res.data[0].category
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORY,
        payload: null
      })
    );
};

//编辑分类
export const editCategory = cateData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/admin/edit-category", cateData)
    .then(res =>
      dispatch({
        type: EDIT_CATEGORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : ""
      })
    );
};

//设置分页
export const setCurrentData = currentData => dispatch => {
  dispatch({
    type: SET_CURRENT_DATA,
    payload: currentData
  });
};

export const setCurrentPage = current => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: current
  });
};

// 通过id获取帖子
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// 用户删除自己的帖子
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//管理员删除帖子
export const adminDeletePost = id => dispatch => {
  console.log(id);
  axios
    .delete(`/api/admin/posts/${id}`)
    // .then(res => console.log(res + "ceshi"))
    .then(res =>
      dispatch({
        type: ADMIN_DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// 赞
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// 踩
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// 添加评论
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// 删除评论
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// 正在加载中
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// 清除错误
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  };
};
