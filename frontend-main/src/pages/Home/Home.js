import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Heading,
  Center,
  HStack,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import useContextStore from "../../store/contextStore";
import loadCandidates from "../../constants/loadCandidates";
import { institutePosts } from "../../constants/institutePosts";
import { hostelPosts } from "../../constants/hostelPosts";
import Institute from "../../components/Institute";
import Hostel from "../../components/Hostel";
import Department from "../../components/Department";
function Home() {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const [instituteCandidates, setInstituteCandidates] = useState([]);
  const [hostelCandidates, setHostelCandidates] = useState([]);
  const [departmentCandidates, setDepartmentCandidates] = useState([]);
  
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
      setDepartmentCandidates
    });
  }, []);
  console.log(departmentCandidates);
  return (
    <>
      <Box className="navbar" bg="black" w="100%" p={6} color="white">
        <Flex>
          <Text fontSize="xl">IITM- General Elections 2023</Text>
          <Spacer />
          <Text fontSize="xl">Welcome {rollNo}!</Text>
        </Flex>
      </Box>
      <Institute institutePosts={institutePosts} instituteCandidates={ instituteCandidates} />
      <br></br>
      <Hostel hostelPosts={hostelPosts} hostelCandidates={ hostelCandidates} />
      <br></br>
      <Department departmentCandidates={departmentCandidates} course={ course} />
      <br></br>
    </>
  );
}

export default Home;
