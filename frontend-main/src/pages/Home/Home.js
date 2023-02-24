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
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import useContextStore from "../../store/contextStore";
import useVoteStore from "../../store/voteStore";
import loadCandidates from "../../constants/loadCandidates";
import Institute from "../../components/Institute/Institute";
import Hostel from "../../components/Hostel/Hostel";
import Department from "../../components/Department/Department";
import "./Home.css";

const pollMap = new Map([
  ["Academic Affairs Secretary", "AA"],
  ["Co Curricular Affairs Secretary", "CO"],
  ["Cultural Affairs Secretary (Arts)", "CA"],
  ["Cultural Affairs Secretary (Literary)", "CL"],
  ["Hostel Affairs Secretary", "HA"],
  ["International and Alumni Relations Secretary", "IA"],
  ["Sports Secretary (Institute)", "SP"],
  ["Students General Secretary", "GS"],
  ["General Secretary (Hostel)", "GS"],
  ["Health and Hygiene Secretary", "HH"],
  ["Hostel Legislator", "HL"],
  ["Literary Secretary", "LS"],
  ["Social Secretary", "SO"],
  ["Sports Secretary (Hostel)", "SP"],
  ["Technical Affairs Secretary", "TS"],
]);

const hostelMap = new Map([
  ["Alakananda", "AK"],
  ["Bhadra", "BH"],
  ["Brahmaputra", "BR"],
  ["Cauvery", "CA"],
  ["Ganga", "GN"],
  ["Godavari", "GD"],
  ["Jamuna", "JM"],
  ["Krishna", "KR"],
  ["Mahanadi", "MH"],
  ["Mandakini A", "MA"],
  ["Mandakini B", "MB"],
  ["Narmada", "NM"],
  ["Pampa", "PM"],
  ["Sabarmati", "SM"],
  ["Saraswathi", "SS"],
  ["Sarayu", "SU"],
  ["Sharavati", "SH"],
  ["Sindhu", "SN"],
  ["Swarnamukhi", "SW"],
  ["Tamiraparani", "TM"],
  ["Tapti", "TP"],
  ["Tunga", "TU"],
]);
function validateForm({
  instiAAS,
  instiCOCAS,
  instiCULSECA,
  instiCULSECL,
  instiHAS,
  instiIAR,
  instiSS,
  instiSGS,
  hostelSGS,
  hostelHHS,
  hostelHL,
  hostelLL,
  hostelSL,
  hostelSS,
  hostelTAS,
  setFormError,
}) {
  if (instiAAS == null) {
    setFormError("Please select preference for Academic Affairs Secretary");
    throw new Error("Please select preference for Academic Affairs Secretary");
  }
  if (instiCOCAS == null) {
    setFormError(
      "Please select preference for Co Curricular Affairs Secretary"
    );
    throw new Error(
      "Please select preference for Co Curricular Affairs Secretary"
    );
  }
  if (instiCULSECA == null) {
    setFormError(
      "Please select preference for Cultural Affairs Secretary (Arts)"
    );
    throw new Error(
      "Please select preference for Cultural Affairs Secretary (Arts)"
    );
  }
  if (instiCULSECL == null) {
    setFormError(
      "Please select preference for Cultural Affairs Secretary (Literary)"
    );
    throw new Error(
      "Please select preference for Cultural Affairs Secretary (Literary)"
    );
  }
  if (instiHAS == null) {
    setFormError("Please select preference for Hostel Affairs Secretary");
    throw new Error("Please select preference for Hostel Affairs Secretary");
  }
  if (instiIAR == null) {
    setFormError(
      "Please select preference for International and Alumni Relations Secretary"
    );
    throw new Error(
      "Please select preference for International and Alumni Relations Secretary"
    );
  }
  if (instiSS == null) {
    setFormError("Please select preference for Sports Secretary (Institute)");
    throw new Error(
      "Please select preference for Sports Secretary (Institute)"
    );
  }
  if (instiSGS == null) {
    setFormError("Please select preference for Students General Secretary");
    throw new Error("Please select preference for Students General Secretary");
  }
  if (hostelSGS == null) {
    setFormError("Please select preference for General Secretary(Hostel)");
    throw new Error("Please select preference for General Secretary(Hostel)");
  }
  if (hostelHHS == null) {
    setFormError("Please select preference for Health and Hygiene Secretary");
    throw new Error(
      "Please select preference for Health and Hygiene Secretary"
    );
  }
  if (hostelSL == null) {
    setFormError("Please select preference for Social Secretary");
    throw new Error("Please select preference for Social Secretary");
  }
  if (hostelLL == null) {
    setFormError("Please select preference for Literary Secretary");
    throw new Error("Please select preference for Literary Secretary");
  }
  if (hostelHL == null) {
    setFormError("Please select preference for Hostel Legislator");
    throw new Error("Please select preference for Hostel Legislator");
  }
  if (hostelTAS == null) {
    setFormError("Please select preference for Technical Affairs Secretary");
    throw new Error("Please select preference for Technical Affairs Secretary");
  }
  if (hostelSS == null) {
    setFormError("Please select preference for Sports Secretary");
    throw new Error("Please select preference for Sports Secretary");
  }
}

function generateString1(post, poll, category, totalCandidates, { result }) {
  let finalString;
  console.log(result);
  if (poll == "Institute") {
    finalString = "1";
  } else if (poll == "Hostel") {
    finalString = "2";
  }
  if (poll == "Hostel") {
    finalString = finalString.concat(hostelMap.get(category));
  }
  finalString = finalString.concat(pollMap.get(post));
  if (result == "Abstain") {
    finalString = finalString.concat("10");
    for (let i = 0; i < totalCandidates; i++) {
      finalString = finalString.concat("0");
    }
  } else if (result == "Reject") {
    finalString = finalString.concat("01");
    for (let i = 0; i < totalCandidates; i++) {
      finalString = finalString.concat("0");
    }
  } else {
    finalString = finalString.concat("00");
    for (let i = 1; i <= totalCandidates; i++) {
      result.map((item) => {
        if (item.preference == i) {
          finalString = finalString.concat(item.candidate + 1);
        }
      });
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
    hostelSGSTotalCandidates,
    hostelHHS,
    hostelHHSTotalCandidates,
    hostelHL,
    hostelHLTotalCandidates,
    hostelSS,
    hostelSSTotalCandidates,
    hostelLL,
    hostelLLTotalCandidates,
    hostelSL,
    hostelSLTotalCandidates,
    hostelTAS,
    hostelTASTotalCandidates,
    instiAASTotalCandidates,
    instiCOCASTotalCandidates,
    instiCULSECATotalCandidates,
    instiCULSECLTotalCandidates,
    instiHASTotalCandidates,
    instiIARTotalCandidates,
    instiSSTotalCandidates,
    instiSGSTotalCandidates,
    setFormError,
  }
) {
  e.preventDefault();
  try {
    validateForm({
      instiAAS,
      instiCOCAS,
      instiCULSECA,
      instiCULSECL,
      instiHAS,
      instiIAR,
      instiSS,
      instiSGS,
      hostelSGS,
      hostelHHS,
      hostelHL,
      hostelLL,
      hostelSL,
      hostelSS,
      hostelTAS,
      setFormError,
    });
    let result = instiAAS;
    const instiAASString = generateString1(
      "Academic Affairs Secretary",
      "Institute",
      "Institute",
      instiAASTotalCandidates,
      { result }
    );
    result = instiCOCAS;
    const instiCOCASString = generateString1(
      "Co Curricular Affairs Secretary",
      "Institute",
      "Institute",
      instiCOCASTotalCandidates,
      { result }
    );
    result = instiCULSECA;
    const instiCULSECAString = generateString1(
      "Cultural Affairs Secretary (Arts)",
      "Institute",
      "Institute",
      instiCULSECATotalCandidates,
      { result }
    );
    result = instiCULSECL;
    const instiCULSECLString = generateString1(
      "Cultural Affairs Secretary (Literary)",
      "Institute",
      "Institute",
      instiCULSECLTotalCandidates,
      { result }
    );
    result = instiHAS;
    const instiHASString = generateString1(
      "Hostel Affairs Secretary",
      "Institute",
      "Institute",
      instiHASTotalCandidates,
      { result }
    );
    result = instiIAR;
    const instiIARString = generateString1(
      "International and Alumni Relations Secretary",
      "Institute",
      "Institute",
      instiIARTotalCandidates,
      { result }
    );
    result = instiSS;
    const instiSSString = generateString1(
      "Sports Secretary (Institute)",
      "Institute",
      "Institute",
      instiSSTotalCandidates,
      { result }
    );
    result = instiSGS;
    const instiSGSString = generateString1(
      "Students General Secretary",
      "Institute",
      "Institute",
      instiSGSTotalCandidates,
      { result }
    );
    result = hostelSGS;
    const hostelSGSString = generateString1(
      "General Secretary (Hostel)",
      "Hostel",
      hostel,
      hostelSGSTotalCandidates,
      { result }
    );
    result = hostelSS;
    const hostelSSString = generateString1(
      "Sports Secretary (Hostel)",
      "Hostel",
      hostel,
      hostelSSTotalCandidates,
      { result }
    );
    result = hostelLL;
    const hostelLLString = generateString1(
      "Literary Secretary",
      "Hostel",
      hostel,
      hostelLLTotalCandidates,
      { result }
    );
    result = hostelSL;
    const hostelSLString = generateString1(
      "Social Secretary",
      "Hostel",
      hostel,
      hostelSLTotalCandidates,
      { result }
    );
    result = hostelTAS;
    const hostelTASString = generateString1(
      "Technical Affairs Secretary",
      "Hostel",
      hostel,
      hostelTASTotalCandidates,
      { result }
    );
    result = hostelHL;
    const hostelHLString = generateString1(
      "Hostel Legislator",
      "Hostel",
      hostel,
      hostelHLTotalCandidates,
      { result }
    );
    result = hostelHHS;
    const hostelHHSString = generateString1(
      "Health and Hygiene Secretary",
      "Hostel",
      hostel,
      hostelHHSTotalCandidates,
      { result }
    );
    console.log(instiAASString);
    console.log(instiCOCASString);
    console.log(instiCULSECAString);
    console.log(instiCULSECLString);
    console.log(instiHASString);
    console.log(instiIARString);
    console.log(instiSSString);
    console.log(instiSGSString);
    console.log(hostelSGSString);
    console.log(hostelSSString);
    console.log(hostelHHSString);
    console.log(hostelHLString);
    console.log(hostelLLString);
    console.log(hostelSLString);
    console.log(hostelTASString);
  } catch (error) {
    console.log(error);
  }
}
function Home() {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const residencyType = useContextStore((state) => state.residencyType);
  const [formError, setFormError] = useState(null);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const instiAAS = useVoteStore((state) => state.instiAAS);
  const instiRAS = useVoteStore((state) => state.instiRAS);
  const instiCOCAS = useVoteStore((state) => state.instiCOCAS);
  const instiCULSECA = useVoteStore((state) => state.instiCULSECA);
  const instiCULSECL = useVoteStore((state) => state.instiCULSECL);
  const instiHAS = useVoteStore((state) => state.instiHAS);
  const instiIAR = useVoteStore((state) => state.instiIAR);
  const instiSS = useVoteStore((state) => state.instiSS);
  const instiSGS = useVoteStore((state) => state.instiSGS);
  const hostelSGS = useVoteStore((state) => state.hostelSGS);
  const hostelHHS = useVoteStore((state) => state.hostelHHS);
  const hostelSS = useVoteStore((state) => state.hostelSS);
  const hostelLL = useVoteStore((state) => state.hostelLL);
  const hostelSL = useVoteStore((state) => state.hostelSL);
  const hostelHL = useVoteStore((state) => state.hostelHL);
  const hostelTAS = useVoteStore((state) => state.hostelTAS);
  const [instiAASCandidates, setInstiAASCandidates] = useState([]);
  const [instiAASTotalCandidates, setInstiAASTotalCandidates] = useState();
  const [instiRASCandidates, setInstiRASCandidates] = useState([]);
  const [instiRASTotalCandidates, setInstiRASTotalCandidates] = useState();
  const [instiCOCASCandidates, setInstiCOCASCandidates] = useState([]);
  const [instiCOCASTotalCandidates, setInstiCOCASTotalCandidates] = useState();
  const [instiCULSECACandidates, setInstiCULSECACandidates] = useState([]);
  const [instiCULSECATotalCandidates, setInstiCULSECATotalCandidates] =
    useState();
  const [instiCULSECLCandidates, setInstiCULSECLCandidates] = useState([]);
  const [instiCULSECLTotalCandidates, setInstiCULSECLTotalCandidates] =
    useState();
  const [instiHASCandidates, setInstiHASCandidates] = useState([]);
  const [instiHASTotalCandidates, setInstiHASTotalCandidates] = useState();
  const [instiIARCandidates, setInstiIARCandidates] = useState([]);
  const [instiIARTotalCandidates, setInstiIARTotalCandidates] = useState();
  const [instiSSCandidates, setInstiSSCandidates] = useState([]);
  const [instiSSTotalCandidates, setInstiSSTotalCandidates] = useState();
  const [instiSGSCandidates, setInstiSGSCandidates] = useState([]);
  const [instiSGSTotalCandidates, setInstiSGSTotalCandidates] = useState();
  const [hostelSGSCandidates, setHostelSGSCandidates] = useState([]);
  const [hostelHHSCandidates, setHostelHHSCandidates] = useState([]);
  const [hostelSSCandidates, setHostelSSCandidates] = useState([]);
  const [hostelLLCandidates, setHostelLLCandidates] = useState([]);
  const [hostelSLCandidates, setHostelSLCandidates] = useState([]);
  const [hostelHLCandidates, setHostelHLCandidates] = useState([]);
  const [hostelTASCandidates, setHostelTASCandidates] = useState([]);
  const [hostelSGSTotalCandidates, setHostelSGSTotalCandidates] = useState();
  const [hostelSSTotalCandidates, setHostelSSTotalCandidates] = useState();
  const [hostelHHSTotalCandidates, setHostelHHSTotalCandidates] = useState();
  const [hostelSLTotalCandidates, setHostelSLTotalCandidates] = useState();
  const [hostelLLTotalCandidates, setHostelLLTotalCandidates] = useState();
  const [hostelHLTotalCandidates, setHostelHLTotalCandidates] = useState();
  const [hostelTASTotalCandidates, setHostelTASTotalCandidates] = useState();
  const [departmentCandidates, setDepartmentCandidates] = useState([]);

  const setInstiSGSPreferences = useVoteStore(
    (state) => state.setInstiSGSPreferences
  );
  const setInstiAASPreferences = useVoteStore(
    (state) => state.setInstiAASPreferences
  );
  const setInstiRASPreferences = useVoteStore(
    (state) => state.setInstiAASPreferences
  );
  const setInstiCOCASPreferences = useVoteStore(
    (state) => state.setInstiCOCASPreferences
  );
  const setInstiCULSECAPreferences = useVoteStore(
    (state) => state.setInstiCULSECAPreferences
  );
  const setInstiCULSECLPreferences = useVoteStore(
    (state) => state.setInstiCULSECLPreferences
  );
  const setInstiHASPreferences = useVoteStore(
    (state) => state.setInstiHASPreferences
  );
  const setInstiIARPreferences = useVoteStore(
    (state) => state.setInstiIARPreferences
  );
  const setInstiSSPreferences = useVoteStore(
    (state) => state.setInstiSSPreferences
  );
  const setHostelSGSPreferences = useVoteStore(
    (state) => state.setHostelSGSPreferences
  );
  const setHostelHHSPreferences = useVoteStore(
    (state) => state.setHostelHHSPreferences
  );
  const setHostelSSPreferences = useVoteStore(
    (state) => state.setHostelSSPreferences
  );
  const setHostelSLPreferences = useVoteStore(
    (state) => state.setHostelSLPreferences
  );
  const setHostelHLPreferences = useVoteStore(
    (state) => state.setHostelHLPreferences
  );
  const setHostelLLPreferences = useVoteStore(
    (state) => state.setHostelLLPreferences
  );
  const setHostelTASPreferences = useVoteStore(
    (state) => state.setHostelTASPreferences
  );

  useEffect(() => {
    loadCandidates({
      hostel,
      course,
      department,
      token,
      instiAASCandidates,
      setInstiAASCandidates,
      setInstiAASTotalCandidates,
      instiRASCandidates,
      setInstiRASCandidates,
      setInstiRASTotalCandidates,
      instiCOCASCandidates,
      setInstiCOCASTotalCandidates,
      setInstiCOCASCandidates,
      instiCULSECACandidates,
      setInstiCULSECATotalCandidates,
      setInstiCULSECACandidates,
      instiCULSECLCandidates,
      setInstiCULSECLCandidates,
      setInstiCULSECLTotalCandidates,
      instiHASCandidates,
      setInstiHASCandidates,
      setInstiHASTotalCandidates,
      instiIARCandidates,
      setInstiIARCandidates,
      setInstiIARTotalCandidates,
      instiSSCandidates,
      setInstiSSCandidates,
      setInstiSSTotalCandidates,
      instiSGSCandidates,
      setInstiSGSCandidates,
      setInstiSGSTotalCandidates,
      hostelSGSCandidates,
      setHostelSGSCandidates,
      setHostelSGSTotalCandidates,
      hostelHHSCandidates,
      setHostelHHSCandidates,
      setHostelHHSTotalCandidates,
      hostelSSCandidates,
      setHostelSSCandidates,
      setHostelSSTotalCandidates,
      hostelSLCandidates,
      setHostelSLCandidates,
      setHostelSLTotalCandidates,
      hostelLLCandidates,
      setHostelLLCandidates,
      setHostelLLTotalCandidates,
      hostelTASCandidates,
      setHostelTASCandidates,
      setHostelTASTotalCandidates,
      hostelHLCandidates,
      setHostelHLCandidates,
      setHostelHLTotalCandidates,
      departmentCandidates,
      setDepartmentCandidates,
      setInstiSGSPreferences,
      setInstiAASPreferences,
      setInstiRASPreferences,
      setInstiCOCASPreferences,
      setInstiCULSECAPreferences,
      setInstiCULSECLPreferences,
      setInstiHASPreferences,
      setInstiSSPreferences,
      setInstiIARPreferences,
      setHostelSGSPreferences,
      setHostelHHSPreferences,
      setHostelSSPreferences,
      setHostelSLPreferences,
      setHostelLLPreferences,
      setHostelTASPreferences,
      setHostelHLPreferences,
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
        instiRASCandidates={instiRASCandidates}
        instiCOCASCandidates={instiCOCASCandidates}
        instiCULSECACandidates={instiCULSECACandidates}
        instiCULSECLCandidates={instiCULSECLCandidates}
        instiHASCandidates={instiHASCandidates}
        instiIARCandidates={instiIARCandidates}
        instiSSCandidates={instiSSCandidates}
        instiSGSCandidates={instiSGSCandidates}
        course={course}
      />
      <br></br>
      {residencyType == "H" && (
        <Hostel
          hostelSGSCandidates={hostelSGSCandidates}
          hostelSSCandidates={hostelSSCandidates}
          hostelHHSCandidates={hostelHHSCandidates}
          hostelHLCandidates={hostelHLCandidates}
          hostelLLCandidates={hostelLLCandidates}
          hostelSLCandidates={hostelSLCandidates}
          hostelTASCandidates={hostelTASCandidates}
        />
      )}

      <br></br>
      <Department departmentCandidates={departmentCandidates} course={course} />
      <br></br>
      <Center>
        <Button
          colorScheme="blue"
          onClick={(e) =>
            handleClick(e, {
              hostel,
              instiAAS,
              instiAASTotalCandidates,
              instiRAS,
              instiRASTotalCandidates,
              instiCOCAS,
              instiCOCASTotalCandidates,
              instiCULSECA,
              instiCULSECATotalCandidates,
              instiCULSECL,
              instiCULSECLTotalCandidates,
              instiHAS,
              instiHASTotalCandidates,
              instiIAR,
              instiIARTotalCandidates,
              instiSS,
              instiSSTotalCandidates,
              instiSGS,
              instiSGSTotalCandidates,
              hostelSGS,
              hostelSGSTotalCandidates,
              hostelHHS,
              hostelHHSTotalCandidates,
              hostelSS,
              hostelSSTotalCandidates,
              hostelSL,
              hostelSLTotalCandidates,
              hostelLL,
              hostelLLTotalCandidates,
              hostelTAS,
              hostelTASTotalCandidates,
              hostelHL,
              hostelHLTotalCandidates,
              setFormError,
            })
          }
        >
          Vote
        </Button>
      </Center>
      <div className={formError == null ? "hide" : ""}>
        <Center>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{formError}</AlertTitle>
          </Alert>
        </Center>
      </div>
    </>
  );
}

export default Home;
