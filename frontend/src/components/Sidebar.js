import React from 'react';
import { UnorderedList, ListItem, Link } from '@chakra-ui/react';


const Sidebar = ({selectContent}) => {
    return (
      <div>
        <h2>Procurement</h2>
        <UnorderedList>
          <ListItem onClick={() => selectContent('create-order')}>
            <Link>Create New Order</Link>
          </ListItem>
          <ListItem onClick={() => selectContent('approve-orders')}>
            <Link>Approve Orders</Link>
          </ListItem>
          <ListItem onClick={() => selectContent('view-orders')}>
            <Link>View Orders</Link>
          </ListItem>
        </UnorderedList>
        <br />

        <h2>Stock Monitor</h2>
        <UnorderedList>
          <ListItem onClick={() => selectContent('stock-monitor')}>
            <Link>View Stock</Link>
          </ListItem>
          <ListItem onClick={() => selectContent('stock-history')}>
            <Link>History Log</Link>
          </ListItem>
        </UnorderedList>
        <br />

        <h2>Prescriptions</h2>
        <UnorderedList>
          <ListItem onClick={() => selectContent('view-prescriptions')}>
            <Link>View Prescriptions</Link>
          </ListItem>
          <ListItem onClick={() => selectContent('prescription-history')}>
          <Link>History Log</Link>
          </ListItem>
        </UnorderedList>
      </div>
    );
};

export default Sidebar;