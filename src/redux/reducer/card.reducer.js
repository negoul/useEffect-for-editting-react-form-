import {
  USER_SET_USER_CARD_DETAIL_LOADING,
  USER_SET_USER_CARDS,
  USER_SET_USER_CARDS_LIST_LOADING,
} from "../types";

const initialState = {
  cards: [],
  loading: {
    detail: false,
    list: false,
  },
};

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_USER_CARDS:
      return { ...state, cards: action.data };
    case USER_SET_USER_CARDS_LIST_LOADING:
      return { ...state, loading: { ...state.loading, list: action.data } };
    case USER_SET_USER_CARD_DETAIL_LOADING:
      return { ...state, loading: { ...state.loading, detail: action.data } };
    default:
      return state;
  }
};

export default CardReducer;
