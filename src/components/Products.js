import React, { useEffect, useReducer } from "react";
import productsReducer from "./reducers/products-reducer";
import { getProductsSuccess, getProductsFailure } from "./actions/Index";

const initialState = {
  isLoaded: false,
  products: [],
  error: null
};

function Products() {

  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:5114/api/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          console.log(response);
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        const action = getProductsSuccess(jsonifiedResponse.data); // 'data' is the name of the array that is returned from the API call. In other API's it is called something different. ex: in the NYT API it is called 'results'. You must check your API response to find out what the name of the object or array is to be able to parse the data.
        dispatch(action);
      })
      .catch((error) => {
        const action = getProductsFailure(error.message);
        dispatch(action);
      });
  }, []);

  const { error, products, isLoaded } = state;

  console.log(products);

  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Products</h1>
        <ul>
          {products && products.map((product, index) =>
            <li key={index}>
              <h3>{product.brand}</h3>
              <p>{product.type}</p>
              <p>{product.name}</p>
              <p><img src={product.imageLink} /></p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default Products;