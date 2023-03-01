import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Spacer, Text, Input, Center, HStack, List, ListItem, Table, Th, Tr, Td, useTab} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import "./Admin.css";
import Navbar from "../admin/Navbar.js";
import { ethers, BigNumber } from "ethers";
import ContractAddresses from "./ContractAddresses.json"
import { useFetcher } from "react-router-dom";

function stringToBytes2(str) {
  // convert the string to bytes
  const bytes = ethers.utils.toUtf8Bytes(str);
  // extract the first 2 bytes
  const bytes2 = ethers.utils.hexDataSlice(bytes, 0, 2);
  return bytes2;
}

function AddVoter() {

    const [nodes, setNodes] = useState([]);
  
    useEffect(() => {
      async function fetchNodes() {
        let provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai")
        let adminPrivateKey = "0xa0caae6924e5926393c23d9826ccfbbb07b81e1ece9654c7ef062ce995af6bea";
        let adminWallet = new ethers.Wallet(adminPrivateKey, provider);

        const ElectionAddress = ContractAddresses.Election;
        const ElectionABI = [
            "function getCentralPollDetails (bytes2) public view returns (uint256[4] memory)",
            "function getCentralPollVotes (bytes2) public view returns (uint256[] memory)",
            "function viewNodes() public view returns (address[] memory)"
        ]
        const ElectionContract = new ethers.Contract(ElectionAddress, ElectionABI, adminWallet)
        const addresses = await ElectionContract.viewNodes()
        const balances = await Promise.all(
          addresses.map(async (address) => {
            return await provider.getBalance(address);
          })
        );
        const nodes = addresses.map((address, index) => {
          return {
            address: address,
            balance: ethers.utils.formatEther(balances[index]),
          };
        });
        setNodes(nodes);
      }
  
      fetchNodes();
    }, []);
    
    const renderNodes = nodes.map((node) => {
      return (
        <Box borderWidth='1px' borderRadius='lg' align='center' overflow='hidden'>
          <Table>
            <Th>
              Address
            </Th>
            <Th>
              Balance
            </Th>
            <Tr>
              <Td>
                {node.address}
              </Td>
              <Td>
                {node.balance}
              </Td>
            </Tr>
          </Table>
        </Box>
      )
    })

      return (
        <>
        <Navbar />
        <HStack>
          <Spacer />

          <div>
              <Center>
              <form className="formContent" >
          <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="text" id="username" />
              <FormHelperText color="grey.700">
                Enter the username for this node
              </FormHelperText>
              <FormLabel>Passcode</FormLabel>
              <Input type="text" id="passcode" />
              <FormHelperText color="grey.700">
                Enter the passcode for this node
              </FormHelperText>
              <FormLabel>Wallet address</FormLabel>
              <Input type="text" id="address" />
              <FormHelperText color="grey.700">
                Enter the wallet address from the wallet
              </FormHelperText>
              <Center>
                <Button mt={4} colorScheme="gray" variant="outline" type="Submit">
                  Submit
                </Button>
              </Center>
            </FormControl>
            </form>
            </Center>
          </div>

          <Spacer />

          <Center>
            <div className="app">
              {renderNodes}
            </div>
          </Center>
          <Spacer />

        </HStack>
        </>
      )
}

export default AddVoter;