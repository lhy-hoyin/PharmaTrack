const fetchStock = async () => {
  const response = await fetch(`/auth/stock/view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(),
    credentials: 'include',
  });

  console.log(response)

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data)

  if (Array.isArray(data)) {
    return data;
  } else {
    throw new Error("Invalid data format");
  }
};

export default {
  fetchStock,
};