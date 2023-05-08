import * as act from './ActionTypes';

export const getProductsSuccess = (products) => ({
  type: act.GET_PRODUCTS_SUCCESS,
  products
});

export const getProductsFailure = (error) => ({
  type: act.GET_PRODUCTS_FAILURE,
  error
});