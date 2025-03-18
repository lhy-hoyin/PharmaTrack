import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import OrderItemCard from "./OrderItemCard.js";

const demoAddress = (
  <Card>
    <CardBody>
    <Heading size='md'>PharmaTrack Hospital</Heading>
    <Text>
      123 Industrial Avenue 4<br />
      Novalandia 123456
    </Text>
    </CardBody>
  </Card>
);

const NewOrder = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [orderItems, setOrderItems] = useState([{ id: Date.now() }]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO
        // const response = await fetch('/api/products'); // Replace with actual API endpoint
        // const data = await response.json();

        const parsedData = [
          { id: 1, name: "product 1" },
          { id: 2, name: "product 2" },
          { id: 3, name: "product 3" },
        ];
        setProductOptions(parsedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addOrderItem = () => {
    setOrderItems([...orderItems, { id: Date.now() }]);
  };

  const removeOrderItem = (id) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (orderItems.length < 1) {
      throw Error("Minimum order item is one.");
    }

    // TODO: validation to ensure no duplicates

    // TODO: parse data into json format

    // TODO: API call to create purchase order
    console.log("Submitting order:", orderItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={8} align="start">
        <Box flex="1">
          <Text fontWeight="bold" mb={2}>Bill To:</Text>
          <RadioGroup defaultValue="billing1">
            <VStack align="start">
              <Radio value="billing1">{demoAddress}</Radio>
              {/* Only one address as demo */}
            </VStack>
          </RadioGroup>
        </Box>
        <Box flex="1">
          <Text fontWeight="bold" mb={2}>Deliver To:</Text>
          <RadioGroup defaultValue="delivery1">
            <VStack align="start">
              <Radio value="delivery1">{demoAddress}</Radio>
              {/* Only one address as demo */}
            </VStack>
          </RadioGroup>
        </Box>
      </HStack>
      <Button type="submit" colorScheme="blue" mt={4}>Submit Order</Button>
      <Divider my={4} />

      <VStack spacing={4}>
        {orderItems.map((item) => (
          <OrderItemCard
            key={item.id}
            id={item.id}
            productOptions={productOptions}
            onRemove={removeOrderItem}
          />
        ))}
      </VStack>
      <Button colorScheme="green" onClick={addOrderItem} mt={4}>
        Add More Items
      </Button>
    </form>
  );
};

export default NewOrder;
