import React, { useState } from 'react';
import {
  Box,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const OrderItemCard = ({ 
  id, productOptions, onItemChange, validateRemoval, onRemove 
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
      <HStack spacing={4}>
        <Select
          placeholder="Select product"
          value={selectedProduct}
          onChange={(e) => {
            const value = e.target.value
            setSelectedProduct(value)
            onItemChange(id, value, quantity)
          }}
          isInvalid={selectedProduct === ""}
        >
          {productOptions.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>

        <NumberInput
          maxW={20}
          min={1}
          max={999}
          value={quantity}
          onChange={(valStr) => {
            const value = parseInt(valStr)
            setQuantity(value)
            onItemChange(id, selectedProduct, value)
          }}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="remove"
          variant="outline"
          onClick={() => onRemove(id)}
          isDisabled={!validateRemoval()}
        />
      </HStack>
    </Box>
  );
};

export default OrderItemCard;
