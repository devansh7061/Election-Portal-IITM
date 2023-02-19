import React from "react";
import { Box, Flex, Button, Spacer, Text , HStack, Center} from "@chakra-ui/react";
import "./Admin.css";
import Navbar from "../admin/Navbar.js";

function generateResults() {
    
}

function StartEnd () {

    const generateResults = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
        }
      return (
        <>
        <Navbar />
        <Center h='100px' color='black'>
            <HStack>
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    >
                    Start Election
                    </Button>
                <Spacer />
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    >
                    End Election
                    </Button>
                <Spacer />
                <Button
                    colorScheme="black"
                    variant="outline"
                    _hover={{ bg:"grey"}}
                    onClick={generateResults}
                    >
                    Generate results
                    </Button>
            </HStack>
            
        </Center>
        </>
      )
}

export default StartEnd;