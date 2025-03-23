const getDetails = async(id) => {
  const response = await fetch(`/auth/orders/view/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  
  const responseJson = await response.json();
  return responseJson.message;
};

const createOrder = async (orderItems, billTo, deliverTo) => {
  const response = await fetch(`/auth/orders/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: orderItems,
      bill_to: billTo,
      deliver_to: deliverTo
    }),
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  
  return await response.json();
};

export default {
  getDetails,
  createOrder
};
