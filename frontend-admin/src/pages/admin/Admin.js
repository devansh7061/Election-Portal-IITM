import React from "react";
import { Box, Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import "./Admin.css";

function Admin({ isLoggedIn, setLoggedIn }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    <Navigate to="/"></Navigate>;
  };
  return (
    <>
      <Box className="navbar" bg="black" w="100%" p={6} color="white">
        <Flex>
          <Text fontSize="xl">Admin Portal</Text>
          <Spacer />
          <Text fontSize="md">Start/End Election</Text>
          <Spacer />
          <Text fontSize="md">Add Student</Text>
          <Spacer />
          <Text fontSize="md">Add Candidate</Text>
          <Spacer />
          <Spacer />
          <div className="buttons">
            <Button
              colorScheme="gray"
              variant="outline"
              className="logout-btn"
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </Button>
          </div>
        </Flex>
      </Box>
    </>
  );
}

export default Admin;
