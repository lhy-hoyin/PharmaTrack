import React, { useState, useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
import orderService from '../services/orderService.js';

const demoAddStr = "PharmaTrack Hospital, 123 Industrial Avenue 4, Novalandia 123456"
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
  const [alert, setAlert] = useState();

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

    if (orderItems.length === 0) {
      addOrderItem();
    }
  }, []);

  const checkCanRemove = () => {
    return orderItems.length > 1
  }

  const addOrderItem = () => {
    const _id = Date.now();
    setOrderItems([
      ...orderItems,
      { id: _id, product: null, qty: null }
    ]);
  };

  const removeOrderItem = (id) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id))
    }
  };

  const handleItemChange = (id, product_id, qty) => {
    setOrderItems(orderItems.map((item) =>
        item.id === id ? { ...item, product: product_id, qty: qty } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    // Check minimum order
    if (orderItems.length < 1) {
      return setAlert({
        type: 'error',
        title: 'Minimum order item',
        description: 'You need to order at least one item.'
      });
    }

    // Check no empty items
    if (orderItems.filter((item) => item.product === null).length !== 0) {
      return setAlert({
        type: 'error',
        title: 'Invalid product(s)',
        description: 'Remove item(s) which are blank.'
      });
    }

    // Validate no duplicate products
    const productIds = orderItems.map(item => item.product);
    const hasDuplicates = productIds.some((id, index) => productIds.indexOf(id) !== index);
    if (hasDuplicates) {
      return setAlert({
        type: 'error',
        title: 'Duplicate products',
        description: 'Each product in the order must be unique.'
      });
    }

    // API call to create purchase order
    try {
      const orderData = orderItems.map(({ id, ...rest }) => rest);
      await orderService.createOrder(orderData, demoAddStr, demoAddStr);
      setAlert({
        type: 'success',
        title: 'Purchase Order Created',
        description: 'Purchase Order is pending approval.'
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      setAlert({
        type: 'error',
        title: 'Order Submission Failed',
        description: 'There was an error submitting your order. Please try again.'
      });
    }
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

      {alert != null ? 
        <Alert status={alert.type}>
          <AlertIcon />
          <AlertTitle>{alert?.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      : <></>}

      <Button type="submit" colorScheme="green" mt={4}>Submit Order</Button>
      <Divider my={4} />

      <VStack spacing={4}>
        {orderItems.map((item) => (
          <OrderItemCard
            key={item.id}
            id={item.id}
            productOptions={productOptions}
            onItemChange={handleItemChange}
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
