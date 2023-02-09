import React from "react";
import ReactDOM from "react-dom";
import { Box, Flex, Button, Spacer, Text } from "@chakra-ui/react";
import "./Admin.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  BrowserRouter,
  Link
} from "react-router-dom";

const rootElement = document.getElementById("root");

function Navbar({ isLoggedIn, setLoggedIn }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    <Navigate to="/"></Navigate>;
  };
  const navigate = useNavigate();
  return (
    <>
        <Box className="navbar" bg="black" w="100%" p={6} color="white">
          <Flex>
          <Text fontSize="xl">Admin Portal</Text>
          <Spacer />
          <Button
              colorScheme="gray"
              variant="outline"
              _hover={{ bg:"grey"}}
              onClick={() => navigate("/startend")}
            >
              Start/End Election
            </Button>
            <Spacer />
          <Button
              colorScheme="gray"
              variant="outline"
              _hover={{ bg:"grey"}}
              onClick={() => navigate("/viewstats")}
            >
              View Live Stats
            </Button>
          <Spacer />
          <Button
              colorScheme="gray"
              variant="outline"
              _hover={{ bg:"grey"}}
              onClick={() => navigate("/addvoter")}
            >
              Add Voter
            </Button>
          <Spacer />
            <Button
              colorScheme="gray"
              variant="outline"
              _hover={{ bg:"grey"}}
              onClick={() => navigate("/addnode")}
            >
              Add Node
            </Button>
          <Spacer />
          <div className="buttons">
            <Button
              colorScheme="gray"
              variant="outline"
              className="logout-btn"
              _hover={{ bg:"grey"}}
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

export default Navbar;
