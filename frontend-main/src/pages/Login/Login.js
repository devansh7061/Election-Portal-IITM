import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  Image,
  FormControl,
  InputRightElement,
  Center,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import useContextStore from "../../store/contextStore";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function handleSubmit(
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
    setRollNo,
    setResidencyType,
    deviceToken,
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
                    virtualHostel
                    program
                    department
                    hasVoted
                    residencyType
                }
            }
        `,
  };
  fetch("https://wbsec2023.iitm.ac.in/api/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + deviceToken,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        setError(true);
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((resData) => {
      if (resData.data.login.hasVoted === "true") {
        setError(true);
        throw new Error("You have already voted!");
      }
      if (resData.data.login.token) {
        setToken(resData.data.login.token);
        setCourse(resData.data.login.program);
        setDepartment(resData.data.login.department);
        setHostel(resData.data.login.virtualHostel);
        setHasVoted(resData.data.login.hasVoted);
        setResidencyType(resData.data.login.residencyType);
        setRollNo(rollNo);
        console.log(isLoggedIn);
        setLoggedIn("true");
        console.log(isLoggedIn);
      }
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    });
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const setToken = useContextStore((state) => state.setToken);
  const setCourse = useContextStore((state) => state.setCourse);
  const setDepartment = useContextStore((state) => state.setDepartment);
  const setHostel = useContextStore((state) => state.setHostel);
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const setRollNo = useContextStore((state) => state.setRollNo);
  const isLoggedIn = useContextStore((state) => state.isLoggedIn);
  const setResidencyType = useContextStore((state) => state.setResidencyType);
  const deviceToken = useContextStore((state) => state.deviceToken);
  console.log(isLoggedIn);
  const loggedInStatus = isLoggedIn == "true";
  const setLoggedIn = useContextStore((state) => state.setLoggedIn);
  const [error, setError] = useState(false);
  return loggedInStatus ? (
    <Navigate to="/home" replace />
  ) : (
    <div>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="#2e363f"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
          borderRadius="10px"
          borderColor="#2e363f"
          borderWidth="2px"
        >
          <Box minW={{ base: "90%", md: "468px" }} bg="#2b333b" padding="10px">
            <Center>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png"
                boxSize="50px"
              ></Image>
              <Text color="gray.300" fontSize="2xl" marginLeft="5px">
                Student Login
              </Text>
            </Center>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                bg="#2b333b"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input placeholder="rollNo" id="rollNo" color="gray.300" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      color="gray.300"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="linkedin"
                  width="full"
                  onClick={(e) =>
                    handleSubmit(e, {
                      setLoggedIn,
                      isLoggedIn,
                      setCourse,
                      setDepartment,
                      setHasVoted,
                      setHostel,
                      setToken,
                      setError,
                      setRollNo,
                      setResidencyType,
                      deviceToken,
                    })
                  }
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
          {error == true ? (
            <Center>
              <Alert status="info">
                <AlertIcon />
                Invalid credentials or already voted!
              </Alert>
            </Center>
          ) : (
            <></>
          )}
        </Stack>
      </Flex>
    </div>
  );
}

export default Login;
