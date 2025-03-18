import React from 'react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import AddProductModal from "./AddProductModal.js";

const NewOrder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Product
      </Button>
      <AddProductModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default NewOrder;