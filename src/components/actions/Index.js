import * as action from './ActionTypes';

export const getProductsSuccess = (products) => ({
  type: action.GET_PRODUCTS_SUCCESS,
  products
});

export const GET_PRODUCTS_FAILURE = (error) => ({
  type: action.GET_PRODUCTS_FAILURE,
  error
});