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

export default {
    fetchProducts,
};
