import {
  GET_QUOTES,
  LOADING_QUOTES,
  GET_LIKED,
  TOGGLE_LIKE,
  REMOVE_LIKED
} from "../actions/types";

const initialState = {
  quotes: [],
  liked: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload,
        loading: false
      };
    case GET_LIKED:
      return {
        ...state,
        liked: action.payload
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        liked: state.liked.filter(like => like.quoteId !== action.payload)
      };
    case REMOVE_LIKED:
      return {
        ...state,
        liked: []
      };
    case LOADING_QUOTES:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
