import * as act from './ActionTypes';

export const getProductsSuccess = (products) => ({
  type: act.GET_PRODUCTS_SUCCESS,
  products
});

export const GET_PRODUCTS_FAILURE = (error) => ({
  type: act.GET_PRODUCTS_FAILURE,
  error
});