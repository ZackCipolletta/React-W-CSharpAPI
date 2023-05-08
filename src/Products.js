import React, { useEffect } from "react";
import { getProductsSuccess, getProductsFailure } from "./components/actions/Index";

function Products() {

  useEffect(() => {
    fetch(`address`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        const action = getProductsSuccess(jsonifiedResponse.results);
        dispatch(action);
      })
      .catch((error) => {
        const action = getProductsFailure(error.message);
        dispatch(action);
      });
  }, []);

  const { error, products } = state;

  if (error) {
    return <h1>Error: {error}</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Products</h1>
        <ul>
          {products.map((product, index) =>
            <li key={index}>
              <h3>{product.brand}</h3>
              <p>{product.type}</p>
              <p>{product.name}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}