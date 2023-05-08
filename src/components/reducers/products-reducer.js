import * as act from '../actions/ActionTypes';

const productsReducer = (state, action) => {
  switch (action.type) {
    case act.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        products: action.products
      };
    case act.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
};

export default productsReducer;