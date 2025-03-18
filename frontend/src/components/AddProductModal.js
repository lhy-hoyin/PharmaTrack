import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

const AddProductModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [supplier, setSupplier] = useState('');
  const toast = useToast();

  const onSubmit = () => {
    const submitError = 'Something went wrong';

    const addProductPromise = new Promise((resolve, reject) => {
      // TODO: do an API call to add to backend database
      console.log('Product Details:', { productName, description, manufacturer, supplier });
      setTimeout(() => resolve(200), 3000);
    })
    .then((response) => {
      onClose(); // close modal
    })
    .catch((error) => {
      submitError = error;
    });

    toast.promise(addProductPromise, {
      loading: { title: 'Adding product', description: 'Please wait' },
      success: { title: 'Product added', description: 'Looks great' },
      error: { title: 'Failed', description: submitError },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Manufacturer</FormLabel>
              <Input
                placeholder="Manufacturer name"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Supplier</FormLabel>
              <Input
                placeholder="Supplier name"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
              <FormHelperText>
                Put <i>N/A</i> if unknown
              </FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onSubmit}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
