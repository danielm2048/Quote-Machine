import axios from "axios";
import {
  GET_QUOTES,
  GET_LIKED,
  TOGGLE_LIKE,
  REMOVE_LIKED,
  LOADING_QUOTES
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getQuotes = () => dispatch => {
  dispatch(setQuotesLoading());
  axios
    .get("https://gentle-beyond-48579.herokuapp.com/api/quotes")
    .then(res => {
      dispatch({
        type: GET_QUOTES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getLiked = userId => (dispatch, getState) => {
  dispatch(setQuotesLoading());
  axios
    .get(
      `https://gentle-beyond-48579.herokuapp.com/api/likes/${userId}`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: GET_LIKED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const toggleLike = (userId, quoteId) => (dispatch, getState) => {
  axios
    .put(
      `https://gentle-beyond-48579.herokuapp.com/api/likes/update/${userId}/${quoteId}`,
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: TOGGLE_LIKE,
        payload: res.data.quoteId
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const removeLiked = () => {
  return {
    type: REMOVE_LIKED
  };
};

export const setQuotesLoading = () => {
  return {
    type: LOADING_QUOTES
  };
};
