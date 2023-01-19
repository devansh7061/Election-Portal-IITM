import React, { useState } from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";
import {
  HStack,
  VStack,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useContextStore from "../../store/contextStore";

function verifyLogin(
  e,
  {
    setLoggedIn,
    isLoggedIn,
    setCourse,
    setDepartment,
    setHasVoted,
    setHostel,
    setToken,
    setError,
    setRollNo
  }
) {
  e.preventDefault();
  const rollNo = document.getElementById("rollNo").value;
  const password = document.getElementById("password").value;
  if (rollNo.trim().length === 0 || password.trim().length === 0) {
    return;
  }
  const requestBody = {
    query: `
            query {
                login(rollNo: "${rollNo}", password: "${password}") {
                    token
                    studentId
                    tokenExpiration
                    hostel
                    course
                    department
                    hasVoted
                }
            }
        `
  };
  fetch("http://localhost:5000/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((resData) => {
      if (resData.data.login.hasVoted === "true") {
        setError(true);
        throw new Error("You have already voted, come next year!");
      }
      if (resData.data.login.token) {
        setToken(resData.data.login.token);
        setCourse(resData.data.login.course);
        setDepartment(resData.data.login.department);
        setHostel(resData.data.login.hostel);
        setHasVoted(resData.data.login.hasVoted);
        setRollNo(rollNo);
        console.log(isLoggedIn);
        setLoggedIn("true");
        console.log(isLoggedIn);
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function Login() {
  const setToken = useContextStore((state) => state.setToken);
  const setCourse = useContextStore((state) => state.setCourse);
  const setDepartment = useContextStore((state) => state.setDepartment);
  const setHostel = useContextStore((state) => state.setHostel);
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const setRollNo = useContextStore((state) => state.setRollNo);
  const isLoggedIn = useContextStore((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const loggedInStatus = (isLoggedIn == "true");
  const setLoggedIn = useContextStore((state) => state.setLoggedIn);
  const [error, setError] = useState(false);
  return (
    loggedInStatus ? (
      <Navigate to ="/home" replace />
    ) : (
        <div className="landing">
      <div className="login-body">
        <HStack spacing="400px">
          <>
            <VStack>
              <div className="login-heading">
                <Heading size="md">IIT Madras Voters Portal</Heading>
                <Center>
                  <Heading size="md">2023</Heading>
                </Center>
              </div>
            </VStack>
            <VStack></VStack>
          </>
          <div className="form">
            <Center>
              <form
                onSubmit={(e) =>
                  verifyLogin(e, {
                    setLoggedIn,
                    isLoggedIn,
                    setToken,
                    setCourse,
                    setDepartment,
                    setHostel,
                    setHasVoted,
                    setError,
                    setRollNo
                  })
                }
              >
                <FormControl>
                  <VStack spacing="40px">
                    <Heading size="md">Login</Heading>
                    <Input placeholder="Roll No" width="auto" id="rollNo" />
                    <Input
                      placeholder="Password"
                      width="auto"
                      type="password"
                      id="password"
                    />
                  </VStack>
                  <Center>
                    <Button
                      mt={4}
                      colorScheme="purple"
                      variant="outline"
                      type="Submit"
                    >
                      Submit
                    </Button>
                  </Center>
                  <br></br>
                  <Center>
                    {error ? (
                      <Alert status="info">
                        <AlertIcon />
                        You have already voted, come next year!
                      </Alert>
                    ) : null}
                  </Center>
                </FormControl>
              </form>
            </Center>
          </div>
        </HStack>
      </div>
    </div>
    )
  );
}

export default Login;
