import React, { useState } from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import authService from '../services/authService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await authService.register({ username, password });
      setSubmitting(false);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required />
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required />
          </FormControl>
          <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
            Register
          </Button>
        </form>
  );
};

export default RegisterForm;