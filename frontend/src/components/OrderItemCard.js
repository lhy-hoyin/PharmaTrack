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
  id, productOptions, setProductOptions, onItemChange, validateRemoval, onRemove 
}) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
      <HStack spacing={4}>
        <Select
          placeholder="Select product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          isInvalid={selectedProduct === ""}
        >
          {productOptions.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>

        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
          aria-label="Add Product"
        />

        <NumberInput
          maxW={20}
          min={1}
          max={999}
          defaultValue={1}
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
