import React from 'react';
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
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import AddProductModal from "./AddProductModal.js";

const OrderItemCard = ({ id, productOptions, onRemove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
      <HStack spacing={4}>
        <Select placeholder="Select product">
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
          icon={<CloseIcon />}
          colorScheme="red"
          onClick={() => onRemove(id)}
          isDisabled={productOptions.length === 1}
        />
      </HStack>

      <AddProductModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderItemCard;
