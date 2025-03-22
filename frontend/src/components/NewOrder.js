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
  useDisclosure
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import OrderItemCard from "./OrderItemCard.js";
import AddProductModal from "./AddProductModal.js";
import productService from '../services/productService.js';

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
  const [orderItems, setOrderItems] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.fetchProducts();
        const parsedData = data.map(product => ({
          id: product.id,
          name: `${product.name} (${product.supplier})`,
        }));
        setProductOptions(parsedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
    addOrderItem();
  }, []);

  const checkCanRemove = () => {
    return orderItems.length > 1
  }

  const addOrderItem = () => {
    const _id = Date.now();
    setOrderItems([
      ...orderItems,
      { id: _id, product: null }
    ]);
  };

  const removeOrderItem = (id) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <Button type="submit" colorScheme="green" mt={4}>Submit Order</Button>
      <Divider my={4} />

      <VStack spacing={4}>
        {orderItems.map((item) => (
          <OrderItemCard
            key={item.id}
            id={item.id}
            productOptions={productOptions}
            validateRemoval={checkCanRemove}
            onRemove={removeOrderItem}
          />
        ))}
      </VStack>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button colorScheme="blue" onClick={addOrderItem} margin={2}>
          Add More Items
        </Button>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
          margin={2}
          >
          Add Product
        </Button>
        <AddProductModal isOpen={isOpen} onClose={onClose} />
      </div>
    </form>
  );
};

export default NewOrder;
