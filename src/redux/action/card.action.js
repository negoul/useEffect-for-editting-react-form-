import {getCardFormat} from 'utils/bank.util';
import api from "../../api/card.api";
import * as types from "../types";

export const setCards = (cards = []) => ({
  type: types.USER_SET_USER_CARDS,
  data: cards,
});

export const setListLoading = (loading) => ({
  type: types.USER_SET_USER_CARDS_LIST_LOADING,
  data: loading,
});

export const setDetailLoading = (loading) => ({
  type: types.USER_SET_USER_CARD_DETAIL_LOADING,
  data: loading,
});

export function fetchUserCards(userId) {
  return (dispatch) => {
    // dispatch(setListLoading(true));
    return api.fetchUserCards(userId)
      .then(response => {
        // dispatch(setCards(response));
        // dispatch(setListLoading(false));
        const cards = response.map(item => ({
          ...item,
          pan: getCardFormat(item.pan),
          branchName: item.branch.name,
          bankName: item.bank.label,
          expireDate: `${item.expireYear ? item.expireYear : '-'}/${item.expireMonth ? item.expireMonth : '-'}`,
          typeName: item.type.name
        }));
        return cards;
      })
      .catch((error) => {
        // dispatch(setListLoading(false));
        return Promise.reject(error);
      });
  };
}

export function fetchUserCard(cardId) {
  return async (dispatch, getState) => {
    dispatch(setDetailLoading(true));
    const { selectedCustomer } = getState().user;
    return api
      .fetchUserCard(selectedCustomer.id, cardId)
      .then(async (response) => {
        dispatch(setDetailLoading(false));
        return response;
      })
      .catch((error) => {
        dispatch(setDetailLoading(false));
        return Promise.reject(error);
      });
  };
}
