import React from 'react';
import { Tabs } from "@chakra-ui/react";
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h2>PharmaTrack</h2>

      <Tabs.Root defaultValue="login">
      <Tabs.List>
        <Tabs.Trigger value="login">Login</Tabs.Trigger>
        <Tabs.Trigger value="register">Register</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="login"><LoginForm /></Tabs.Content>
      <Tabs.Content value="register"><RegisterForm /></Tabs.Content>
    </Tabs.Root>

      {/* <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs> */}
    </div>
  );
};

export default HomePage;