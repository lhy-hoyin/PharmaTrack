import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Alert,
  AlertIcon,
  Box,
  Heading
} from '@chakra-ui/react';
import stockService from '../services/stockService';

const ViewStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await stockService.fetchStock();
        setStock(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
    </Alert>
    );
  }

  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>Inventory Stock</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Manufacturer</Th>
              <Th>Total Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stock.map(item => (
              <Tr key={item.id}>
                <Td>{item.product_id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.manufacturer}</Td>
                <Td>{item.total_qty}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewStock;
