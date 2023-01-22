import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Heading,
  Center,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import useContextStore from "../../store/contextStore";
import useVoteStore from "../../store/voteStore";
import loadCandidates from "../../constants/loadCandidates";
import Institute from "../../components/Institute/Institute";
import Hostel from "../../components/Hostel/Hostel";
import Department from "../../components/Department";

function handleClick(e) {
  e.preventDefault();
}
function Home() {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const [instiAASCandidates, setInstiAASCandidates] = useState([]);
  const [instiCOCASCandidates, setInstiCOCASCandidates] = useState([]);
  const [instiCULSECACandidates, setInstiCULSECACandidates] = useState([]);
  const [instiCULSECLCandidates, setInstiCULSECLCandidates] = useState([]);
  const [instiHASCandidates, setInstiHASCandidates] = useState([]);
  const [instiIARCandidates, setInstiIARCandidates] = useState([]);
  const [instiSSCandidates, setInstiSSCandidates] = useState([]);
  const [instiSGSCandidates, setInstiSGSCandidates] = useState([]);
  const [hostelSGSCandidates, setHostelSGSCandidates] = useState([]);
  const [departmentCandidates, setDepartmentCandidates] = useState([]);

  useEffect(() => {
    loadCandidates({
      hostel,
      course,
      department,
      token,
      instiAASCandidates,
      setInstiAASCandidates,
      instiCOCASCandidates,
      setInstiCOCASCandidates,
      instiCULSECACandidates,
      setInstiCULSECACandidates,
      instiCULSECLCandidates,
      setInstiCULSECLCandidates,
      instiHASCandidates,
      setInstiHASCandidates,
      instiIARCandidates,
      setInstiIARCandidates,
      instiSSCandidates,
      setInstiSSCandidates,
      instiSGSCandidates,
      setInstiSGSCandidates,
      hostelSGSCandidates,
      setHostelSGSCandidates,
      departmentCandidates,
      setDepartmentCandidates,
    });
  }, []);
  return (
    <>
      <Box className="navbar" bg="black" w="100%" p={6} color="white">
        <Flex>
          <Text fontSize="xl">IITM- General Elections 2023</Text>
          <Spacer />
          <Text fontSize="xl">Welcome {rollNo}!</Text>
        </Flex>
      </Box>
      <Institute
        instiAASCandidates={instiAASCandidates}
        instiCOCASCandidates={instiCOCASCandidates}
        instiCULSECACandidates={instiCULSECACandidates}
        instiCULSECLCandidates={instiCULSECLCandidates}
        instiHASCandidates={instiHASCandidates}
        instiIARCandidates={instiIARCandidates}
        instiSSCandidates={instiSSCandidates}
        instiSGSCandidates={instiSGSCandidates}
      />
      <br></br>
      <Hostel hostelSGSCandidates={hostelSGSCandidates} />
      <br></br>
      {/* <Department departmentCandidates={departmentCandidates} course={course} /> */}
      <br></br>
      <Center>
        <Button colorScheme="blue" onClick={(e) => handleClick(e)}>Vote</Button>
      </Center>
    </>
  );
}

export default Home;
