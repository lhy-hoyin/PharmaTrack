import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await authService.login({ username, password });
      login();
      navigate('/dashboard');
    } catch (error) {
      alert("Login " + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input id="login-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required />
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id="login-password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required />
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
