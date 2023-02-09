import React from "react";
import "./Admin.css";
import Navbar from "./Navbar.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import HostelPolls from "./HostelPolls.js"


const ViewStats = () => {
      return (
        <>
        <Navbar/>
        <Tabs isFitted variant='line' colorScheme='black'>
          <TabList>
            <Tab>Central Polls</Tab>
            <Tab>Hostel Polls</Tab>
            <Tab>Department Polls</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HostelPolls />
            </TabPanel>
            <TabPanel>
              <HostelPolls />
            </TabPanel>
            <TabPanel>
              <HostelPolls />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </>
      )
}

export default ViewStats;