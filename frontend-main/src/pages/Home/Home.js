import React from "react";
import { Box, Flex, Spacer, Text, Heading, Center } from "@chakra-ui/react";
import OneCandidateCard from "../../components/oneCandidateCard";
import manyCandidateCard from "../../components/manyCandidateCard";
import Reject from "../../components/Reject";
import Abstain from "../../components/Abstain";
import useContextStore from "../../store/contextStore";

function Home() {
    const setHasVoted = useContextStore((state) => state.setHasVoted);
    const rollNo = useContextStore((state) => state.rollNo);
    return (
      <>
        <Box className="navbar" bg="black" w="100%" p={6} color="white">
          <Flex>
            <Text fontSize="xl">IITM- General Elections 2023</Text>
            <Spacer />
            <Text fontSize="xl">Welcome {rollNo}!</Text>
          </Flex>
        </Box>
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1}>
            Institute Elections
          </Heading>
        </Center>
        <div className="institute">
          <OneCandidateCard rollNo="NA20B016" name="Devansh" />
          <Abstain />
          <Reject />
        </div>
      </>
    );
}

export default Home;
