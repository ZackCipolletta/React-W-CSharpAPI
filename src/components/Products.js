import React, { useEffect, useReducer, Fragment, useState } from "react";
import productsReducer from "./reducers/products-reducer";
import { getProductsSuccess, getProductsFailure } from "./actions/Index";
import {
  chakra, Box, Stack, VStack, HStack, Flex, Text, Image,
  Container, Icon, StackProps, Button, ButtonProps, useColorModeValue
} from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsTelephoneX } from 'react-icons/bs';

const initialState = {
  isLoaded: false,
  products: [],
  error: null
};


const CustomButton = ({ children, ...props }) => {
  return (
    <Button textTransform="uppercase" lineHeight="inherit" rounded="md" {...props}>
      {children}
    </Button>
  );
};


function Products() {

  const [backgroundColor, setBackgroundColor] = useState(useColorModeValue('white', 'gray.800'));
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
        {products && products.map((product, index) =>
          <Container p={{ base: 5, md: 10 }}>
            <Box
              borderWidth="1px"
              // borderColor={"black"}
              _hover={{ shadow: 'lg' }}
              rounded="md"
              overflow="hidden"
              bg={backgroundColor}
            >
              <Image
                src={product.imageLink}
                objectFit="cover"
                w="100%"
              />
              <Box p={{ base: 3, sm: 5 }}>
                <Box mb={6}>
                  <chakra.h3
                    fontSize={{ base: 'lg', sm: '2xl' }}
                    fontWeight="bold"
                    lineHeight="1.2"
                    mb={2}
                  >
                    {product.brand}<span> {product.type}</span><br />
                    Model: {product.name}
                    
                  </chakra.h3>
                  <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2}>
                    {product.description}
                  </Text>
                </Box>
                <Stack
                  justify="space-between"
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={{ base: 2, sm: 0 }}
                >
                  <CustomButton variant="outline">Not a member?</CustomButton>
                  <CustomButton colorScheme="teal" variant="solid">
                    Access Now
                  </CustomButton>
                </Stack>
              </Box>
            </Box>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default Products;