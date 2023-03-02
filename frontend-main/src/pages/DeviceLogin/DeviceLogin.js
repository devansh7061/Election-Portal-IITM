import { useState } from "react";
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
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import useContextStore from "../../store/contextStore";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function handleSubmit(e, {setDeviceLoggedIn, setDeviceUsername, setDeviceToken}) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    const requestBody = {
        query: `
                query {
                    deviceLogin(username: "${username}", password: "${password}") {
                        username
                        token
                    }
                }
        `
    };
    fetch("http://wbsec2023.iitm.ac.in/api/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed")
        }
        return res.json();
    })
        .then((resData) => {
            if (resData.data.deviceLogin.token) {
            setDeviceUsername(resData.data.deviceLogin.username);
            setDeviceToken(resData.data.deviceLogin.token);
            setDeviceLoggedIn("true");
        }
    })
        .catch((err) => {
            console.log(err);
    })
}
function DeviceLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const setDeviceUsername = useContextStore((state) => state.setDeviceUsername);
  const deviceLoggedIn = useContextStore((state) => state.deviceLoggedIn);
  const setDeviceLoggedIn = useContextStore((state) => state.setDeviceLoggedIn);
  const setDeviceToken = useContextStore((state) => state.setDeviceToken)
  const deviceLoggedInStatus = (deviceLoggedIn == "true");
  return deviceLoggedInStatus ? (
    <Navigate to="/login" replace />
  ) : (
    <div>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="gray" />
          <Heading color="blackAlpha.800">Device Login</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input placeholder="username" id="username" />
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
                      setDeviceLoggedIn,
                      setDeviceUsername,
                      setDeviceToken,
                    })
                  }
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}

export default DeviceLogin;
