import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Text,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Center,
  HStack,
  Tag ,
} from '@chakra-ui/react';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import orderService from '../services/orderService';
import userService from '../services/userService';
import productService from '../services/productService';

const PurchaseOrder = () => {
  const steps = [
    { title: 'Created', description: '' },
    { title: 'Approved', description: '' },
    { title: 'Ordered', description: '' },
    { title: 'Delivered', description: '' },
    { title: 'Completed', description: '' },
  ]

  const [poDetails, setPoDetails] = useState(null);
  const [alert, setAlert] = useState();
  
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  useEffect(() => {
    const fetchDetails = async () => {
      setAlert(null);
      
      try {
        // Fetch PO details
        const details = await orderService.getDetails(id);
  
        // Setup Stepper stage using status
        const index = steps.findIndex(step => step.title === details.status);
        setActiveStep(index + 1);
  
        // Fetch item details
        const itemDetails = await Promise.all(
          JSON.parse(details.items).map(async (item) => {
            const { id, name, description, supplier } = await productService.getInfo(item.product);
          return { id, name, description, supplier, quantity: item.qty };
          })
        );
  
        // Parse details into human friendly form
        setPoDetails({
          ...details,
          items: itemDetails,
          requester: await userService.fetchNameById(details.requester),
          approver: await userService.fetchNameById(details?.approver) || "N/A",
          timestamp: new Date(details.timestamp).toUTCString(),
        });
      }
      catch(error) {
        console.error(error)
        return setAlert({
          type: 'error',
          title: 'Something went wrong',
          description: error.message
        });
      }
    };

    fetchDetails();
  }, []);

  // Loading or Error state
  if (!poDetails) {
    return (<>{ 
      alert == null ?
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      :
        <Alert status={alert.type}>
          <AlertIcon />
          <AlertTitle>{alert?.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
    }</>);
  }

  return (
    <Box p={5} spacing={10}>
      <Heading size="md">Purchase Order Details</Heading>
      <Stepper spacing={8} index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
      </Stepper>

      <HStack spacing={8} align="start">
        <Box flex="1">
          <Text fontWeight="bold" mb={2}>Bill To:</Text>
          <Card>
              <CardBody>
              {/* <Heading size='md'>PharmaTrack Hospital</Heading> */}
              <Text>
                {poDetails.bill_to}
              </Text>
              </CardBody>
            </Card>
        </Box>
        <Box flex="1">
          <Text fontWeight="bold" mb={2}>Deliver To:</Text>
          <Card>
              <CardBody>
              {/* <Heading size='md'>PharmaTrack Hospital</Heading> */}
              <Text>
                {poDetails.deliver_to}
              </Text>
              </CardBody>
            </Card>
        </Box>
      </HStack>

      <Box mt={5}>
        <Box>Purchase Order Number: {poDetails.id}</Box>
        <Box>Timestamp: {poDetails.timestamp}</Box>
        <Box>Requester: <Tag>{poDetails.requester}</Tag></Box>
        <Box>Approver: <Tag>{poDetails.approver}</Tag></Box>
      </Box>

      <Divider my={5} />

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Supplier</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {poDetails.items.map((item) => (            
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.supplier}</Td>
              <Td>{item.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Approve Button */}
      {poDetails.status === 'Created' && (
        <Flex justify="flex-end" mt={5}>
          <Button colorScheme="blue" onClick={onOpen}>
            Approve
          </Button>
        </Flex>
      )}

      
      {/* Confirmation Modal  - TODO: move to its own file*/}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Approval</ModalHeader>
          <ModalBody>
            You are about to approve
            PO#{poDetails.id} created by <Tag>{poDetails.requester}</Tag>.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { /* Approve logic */ }}>
              Approve
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PurchaseOrder;
