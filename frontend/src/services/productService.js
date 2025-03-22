const fetchProducts = async () => {
  const response = await fetch(`/auth/products/view`, {
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
  const data = responseJson.message;

  if (!Array.isArray(data)) {
    throw new Error("Invalid data format");
  }

  return data;
}

const addProduct = async (productData) => {
  const response = await fetch(`/auth/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export default {
    fetchProducts, addProduct
};
