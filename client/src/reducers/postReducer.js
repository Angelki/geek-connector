import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  SET_CURRENT_DATA,
  SET_CURRENT_PAGE,
  GET_CATEGORY,
  EDIT_CATEGORY,
  ADMIN_DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  currentData: [],
  current: 1,
  category: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADMIN_DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case SET_CURRENT_DATA:
      return {
        ...state,
        currentData: action.payload
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        current: action.payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
}
