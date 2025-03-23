const fetchNameById = async(id) => {
  if (!id) {
    return null
  }

  const response = await fetch(`/auth/users/${id}`, {
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
  
export default {
    fetchNameById
};
  