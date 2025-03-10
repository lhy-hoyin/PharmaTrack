import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h2>PharmaTrack</h2>

      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HomePage;