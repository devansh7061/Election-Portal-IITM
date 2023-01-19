import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Heading,
  Center,
  HStack,
} from "@chakra-ui/react";
import OneCandidateCard from "../../components/oneCandidateCard";
import ManyCandidateCard from "../../components/manyCandidateCard";
import Reject from "../../components/Reject";
import Abstain from "../../components/Abstain";
import useContextStore from "../../store/contextStore";
import loadCandidates from "../../constants/loadCandidates";

function Home({isLoggedIn, setLoggedIn}) {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const [instituteCandidates, setInstituteCandidates] = useState([]);
  const [hostelCandidates, setHostelCandidates] = useState([]);
  const [departmentCandidates, setDepartmentCandidates] = useState([]);
  const institutePosts = [
    "Academic Affairs Secretary",
    "Co Curricular Affairs Secretary",
    "Cultural Affairs Secretary (Arts)",
    "Cultural Affairs Secretary (Literary)",
    "Hostel Affairs Secretary",
    "International and Alumni Relations Secretary",
    "Sports Secretary (Institute)",
    "Students General Secretary",
  ];
  const hostelPosts = [
    "General Secretary(Hostel)",
    "Health and Hygiene Secretary",
    "Hostel Legislator",
    "Literary Secretary",
    "Social Secretary",
    "Sports Secretary(Hostel)",
    "Technical Affairs Secretary",
  ];
  useEffect(() => {
    loadCandidates({
      hostel,
      course,
      department,
      token,
      instituteCandidates,
      setInstituteCandidates,
      hostelCandidates,
      setHostelCandidates,
      departmentCandidates,
    });
  }, []);
  console.log(instituteCandidates);
  return (
    <>
      <Box className="navbar" bg="black" w="100%" p={6} color="white">
        <Flex>
          <Text fontSize="xl">IITM- General Elections 2023</Text>
          <Spacer />
          <Text fontSize="xl">Welcome {rollNo}!</Text>
        </Flex>
      </Box>
      <div className="institute">
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1}>
            Institute Elections
          </Heading>
        </Center>
        <br></br>
        {institutePosts.map((post) => {
          return (
            <>
              <Center>
                <Heading as="h2" size="xl" noOfLines={1}>
                  {post}
                </Heading>
              </Center>
              <br></br>
              <HStack spacing="150px">
                {instituteCandidates.map((candidate) => {
                  if (candidate.post === post) {
                    if (candidate.competition === false) {
                      return (
                        <OneCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                          picture={candidate.picture}
                        />
                      );
                    } else {
                      return (
                        <ManyCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                        />
                      );
                    }
                  } else {
                    return <></>;
                  }
                })}
                <Abstain />
                <Reject />
              </HStack>
            </>
          );
        })}
      </div>
      <br></br>
      <div className="hostel">
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1}>
            Hostel Elections
          </Heading>
        </Center>
        <br></br>
        {hostelPosts.map((post) => {
          return (
            <>
              <Center>
                <Heading as="h2" size="xl" noOfLines={1}>
                  {post}
                </Heading>
                <br></br>
              </Center>
              <HStack spacing="150px">
                {instituteCandidates.map((candidate) => {
                  if (candidate.post === post) {
                    if (candidate.competition === false) {
                      return (
                        <OneCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                          picture={candidate.picture}
                        />
                      );
                    } else {
                      return (
                        <ManyCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                        />
                      );
                    }
                  } else {
                    return <></>;
                  }
                })}
                <Abstain />
                <Reject />
              </HStack>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
