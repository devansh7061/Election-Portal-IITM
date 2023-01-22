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

function validateForm({
  instiAAS,
  instiCOCAS,
  instiCULSECA,
  instiCULSECL,
  instiHAS,
  instiIAR,
  instiSS,
  instiSGS,
  hostelSGSP1,
  hostelSGSP2,
  hostelSGSP3,
}) {
  if (instiAAS == null) {
    throw new Error(
      "Please select preference for Institute Academic Affairs Secretary"
    );
  }
  if (instiCOCAS == null) {
    throw new Error(
      "Please select preference for Institute Co Curricular Affairs Secretary"
    );
  }
  if (instiCULSECA == null) {
    throw new Error(
      "Please select preference for Institute Cultural Affairs Secretary (Arts)"
    );
  }
}

function generateString2(post, poll, { hostel, result, p1, p2, p3 }) {
  let finalString;
  console.log(hostel);
  if (poll == "Hostel") {
    finalString = "2";
  }
  if (hostel == "Cauvery") {
    finalString = finalString.concat("CA");
  } else if (hostel == "Sharavati") {
    finalString = finalString.concat("SH");
  }
  if (post == "General Secretary (Hostel)") {
    finalString.concat("GS");
  }
  if (result == "Abstain") {
    finalString = finalString.concat("10000")
  }
  else if (result == "Reject") {
    finalString = finalString.concat("01000")
  } else {
    finalString = finalString.concat("00")
    finalString = finalString.concat(p1 + 1);
    finalString = finalString.concat(p2 + 1);
    finalString = finalString.concat(p3 + 1);
  }
  return finalString;
}
function generateString1(post, poll, category, { result }) {
  let finalString;
  console.log(result);
  if (poll == "Institute") {
    finalString = "1";
  }
  if (post == "Academic Affairs Secretary") {
    finalString = finalString.concat("AA");
  } else if (post == "Co Curricular Affairs Secretary") {
    finalString = finalString.concat("CO");
  } else if (post == "Cultural Affairs Secretary (Arts)") {
    finalString = finalString.concat("CA");
  } else if (post == "Cultural Affairs Secretary (Literary)") {
    finalString = finalString.concat("CL");
  } else if (post == "Hostel Affairs Secretary") {
    finalString = finalString.concat("HA");
  } else if (post == "International and Alumni Relations Secretary") {
    finalString = finalString.concat("IA");
  } else if (post == "Sports Secretary (Institute)") {
    finalString = finalString.concat("SP");
  } else if (post == "Students General Secretary") {
    finalString = finalString.concat("GS");
  }
  if (result == "Abstain") {
    if (
      post == "Students General Secretary" ||
      post == "Cultural Affairs Secretary (Literary)"
    ) {
      finalString = finalString.concat("1000");
    } else {
      finalString = finalString.concat("100");
    }
  } else if (result == "Reject") {
    if (
      post == "Students General Secretary" ||
      post == "Cultural Affairs Secretary (Literary)"
    ) {
      finalString = finalString.concat("0100");
    } else {
      finalString = finalString.concat("010");
    }
  } else {
    if (
      post == "Students General Secretary" ||
      post == "Cultural Affairs Secretary (Literary)"
    ) {
      if (result == "0") {
        finalString = finalString.concat("0012");
      } else {
        finalString = finalString.concat("0021");
      }
    } else {
      finalString = finalString.concat("001");
    }
  }
  return finalString;
}
function handleClick(
  e,
  {
    hostel,
    instiAAS,
    instiCOCAS,
    instiCULSECA,
    instiCULSECL,
    instiHAS,
    instiIAR,
    instiSS,
    instiSGS,
    hostelSGS,
    hostelSGSP1,
    hostelSGSP2,
    hostelSGSP3,
  }
) {
  e.preventDefault();
  try {
    // validateForm({
    //   instiAAS,
    //   instiCOCAS,
    //   instiCULSECA,
    //   instiCULSECL,
    //   instiHAS,
    //   instiIAR,
    //   instiSS,
    //   instiSGS,
    //   hostelSGSP1,
    //   hostelSGSP2,
    //   hostelSGSP3,
    // });
    console.log(instiAAS);
    let result = instiAAS;
    const instiAASString = generateString1(
      "Academic Affairs Secretary",
      "Institute",
      "Institute",
      { result }
    );
    result = instiCOCAS;
    const instiCOCASString = generateString1(
      "Co Curricular Affairs Secretary",
      "Institute",
      "Institute",
      { result }
    );
    result = instiCULSECA;
    const instiCULSECAString = generateString1(
      "Cultural Affairs Secretary (Arts)",
      "Institute",
      "Institute",
      { result }
    );
    result = instiCULSECL;
    const instiCULSECLString = generateString1(
      "Cultural Affairs Secretary (Literary)",
      "Institute",
      "Institute",
      { result }
    );
    result = instiHAS;
    const instiHASString = generateString1(
      "Hostel Affairs Secretary",
      "Institute",
      "Institute",
      { result }
    );
    result = instiIAR;
    const instiIARString = generateString1(
      "International and Alumni Relations Secretary",
      "Institute",
      "Institute",
      { result }
    );
    result = instiSS;
    const instiSSString = generateString1(
      "Sports Secretary (Institute)",
      "Institute",
      "Institute",
      { result }
    );
    result = instiSGS;
    const instiSGSString = generateString1(
      "Students General Secretary",
      "Institute",
      "Institute",
      { result }
    );
    result = hostelSGS;
    let p1 = hostelSGSP1;
    let p2 = hostelSGSP2;
    let p3 = hostelSGSP3;
    const hostelSGSString = generateString2("General Secretary (Hostel)", "Hostel", {hostel, result, p1, p2, p3});
    console.log(instiAASString);
    console.log(instiCOCASString);
    console.log(instiCULSECAString);
    console.log(instiCULSECLString);
    console.log(instiHASString);
    console.log(instiIARString);
    console.log(instiSSString);
    console.log(instiSGSString);
    console.log(hostelSGSString);
  } catch (error) {
    console.log(error);
  }
}
function Home() {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const instiAAS = useVoteStore((state) => state.instiAAS);
  const instiCOCAS = useVoteStore((state) => state.instiCOCAS);
  const instiCULSECA = useVoteStore((state) => state.instiCULSECA);
  const instiCULSECL = useVoteStore((state) => state.instiCULSECL);
  const instiHAS = useVoteStore((state) => state.instiHAS);
  const instiIAR = useVoteStore((state) => state.instiIAR);
  const instiSS = useVoteStore((state) => state.instiSS);
  const instiSGS = useVoteStore((state) => state.instiSGS);
  const hostelSGS = useVoteStore((state) => state.hostelSGS);
  const hostelSGSP1 = useVoteStore((state) => state.hostelSGSP1);
  const hostelSGSP2 = useVoteStore((state) => state.hostelSGSP2);
  const hostelSGSP3 = useVoteStore((state) => state.hostelSGSP3);
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
        <Button
          colorScheme="blue"
          onClick={(e) =>
            handleClick(e, {
              hostel,
              instiAAS,
              instiCOCAS,
              instiCULSECA,
              instiCULSECL,
              instiHAS,
              instiIAR,
              instiSS,
              instiSGS,
              hostelSGS,
              hostelSGSP1,
              hostelSGSP2,
              hostelSGSP3,
            })
          }
        >
          Vote
        </Button>
      </Center>
    </>
  );
}

export default Home;
