import React from "react";
import { Box, Flex, Button, Spacer, Text, Input, Center } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import "./Admin.css";
import Navbar from "../admin/Navbar.js";

function AddVoter() {
      return (
        <>
        <Navbar />
        <div className="form">
            <Center>
            <form className="formContent" >
        <FormControl>
            <FormLabel>Wallet address</FormLabel>
            <Input type="text" id="address" />
            <FormHelperText color="grey.700">
              Enter the wallet address from the wallet
            </FormHelperText>
            <FormLabel>IP address</FormLabel>
            <Input type="text" id="ipaddress" />
            <FormHelperText color="grey.700">
              Enter the IP address of your device
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
        </>
      )
}

export default AddVoter;