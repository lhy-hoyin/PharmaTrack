const order = async (orderItems, billTo, deliverTo) => {
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
    order
};
