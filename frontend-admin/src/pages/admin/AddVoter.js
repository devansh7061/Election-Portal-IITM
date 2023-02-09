import React from "react";
import { Box, Flex, Button, Spacer, Text, Input, Center } from "@chakra-ui/react";
import "./Admin.css";
import Navbar from "../admin/Navbar.js";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';

const AddVoter = () => {
      return (
        <>
        <Navbar />
        <div className="form">
            <Center>
            <form className="formContent" >
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" id="name" />
            <FormLabel>Roll number</FormLabel>
            <Input type="text" id="rollno" />
            <FormLabel>Hostel</FormLabel>
            <Input type="text" id="hostel" />
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