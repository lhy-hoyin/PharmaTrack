const API_URL = 'http://127.0.0.1:5555';

const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

const register = async (credentials) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export default {
  login,
  register,
};
