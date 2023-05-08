import { SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";

function ProductList({ products }) { 
  return (
    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
}

// The ProductList component accepts an array of products as a prop and maps over the array to render a Product component for each item in the array.

// The Product component would render the individual product information for each item in the grid.

// must pass in the array of products inorder for this to work. May need to create a parent component.

export default ProductList; 