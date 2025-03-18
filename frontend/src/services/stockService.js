const fetchStock = async () => {
  const response = await fetch(`/auth/stock/view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(),
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
  if (data.length === 0) {
    throw new Error("Your inventory is empty");
  }

  return data;
};

export default {
  fetchStock,
};
