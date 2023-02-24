import React from "react";
import "./Admin.css";
import Navbar from "./Navbar.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import CentralPolls from "./CentralPolls.js"
import HostelPolls from "./HostelPolls.js"
import DepartmentPolls from "./DepartmentPolls.js";
import MtechPolls from "./MtechPoll.js";


const ViewStats = () => {
      return (
        <>
        <Navbar/>
        <Tabs isFitted variant='line' colorScheme='black'>
          <TabList>
            <Tab>
              <Text as='b'>Central Polls</Text>
              </Tab>
            <Tab>
              <Text as='b'>Hostel Polls</Text>
            </Tab>
            <Tab>
              <Text as='b'>Department Polls</Text>
            </Tab>
            <Tab>
              <Text as='b'>M.Tech Poll</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CentralPolls />
            </TabPanel>
            <TabPanel>
              <HostelPolls />
            </TabPanel>
            <TabPanel>
              <DepartmentPolls />
            </TabPanel>
            <TabPanel>
              <MtechPolls />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </>
      )
}

export default ViewStats;