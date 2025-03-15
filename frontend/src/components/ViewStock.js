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
  Heading,
  IconButton
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import stockService from '../services/stockService';

const ViewStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Inventory Stock</Heading>
        <IconButton
          aria-label="Refresh Stock"
          icon={<RepeatIcon />}
          onClick={fetchData}
        />
      </Box>
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
