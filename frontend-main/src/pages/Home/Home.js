import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  VStack,
  Image,
} from "@chakra-ui/react";
import useContextStore from "../../store/contextStore";
import useVoteStore from "../../store/voteStore";
import loadCandidates from "../../constants/loadCandidates";
import Institute from "../../components/Institute/Institute";
import Hostel from "../../components/Hostel/Hostel";
import Department from "../../components/Department/Department";
import "./Home.css";
import header from  "./header.png"

// Password to generate the hash and salt for encryption
const password = "WBGSE2023";

// Salt rounds for generating the salt
const saltRounds = 10;

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
  hostelSGSTotalCandidates,
  hostelHHS,
  hostelHHSTotalCandidates,
  hostelHL,
  hostelHLTotalCandidates,
  hostelLL,
  hostelLLTotalCandidates,
  hostelSL,
  hostelSLTotalCandidates,
  hostelSS,
  hostelSSTotalCandidates,
  hostelTAS,
  hostelTASTotalCandidates,
  setFormError,
  residencyType,
}) {
  console.log(hostelSGSTotalCandidates, "Sggegdhehhhrhrh")
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
  if (residencyType == "H") {
    if (hostelSGS == null && hostelSGSTotalCandidates>0) {
      setFormError("Please select preference for General Secretary(Hostel)");
      throw new Error("Please select preference for General Secretary(Hostel)");
    }
    if (hostelHHS == null && hostelHHSTotalCandidates > 0) {
      setFormError("Please select preference for Health and Hygiene Secretary");
      throw new Error(
        "Please select preference for Health and Hygiene Secretary"
      );
    }
    if (hostelSL == null && hostelSLTotalCandidates > 0) {
      setFormError("Please select preference for Social Secretary");
      throw new Error("Please select preference for Social Secretary");
    }
    if (hostelLL == null && hostelLLTotalCandidates > 0) {
      setFormError("Please select preference for Literary Secretary");
      throw new Error("Please select preference for Literary Secretary");
    }
    if (hostelHL == null && hostelHLTotalCandidates > 0) {
      setFormError("Please select preference for Hostel Legislator");
      throw new Error("Please select preference for Hostel Legislator");
    }
    if (hostelTAS == null && hostelTASTotalCandidates > 0) {
      setFormError("Please select preference for Technical Affairs Secretary");
      throw new Error(
        "Please select preference for Technical Affairs Secretary"
      );
    }
    if (hostelSS == null && hostelSSTotalCandidates > 0) {
      setFormError("Please select preference for Sports Secretary");
      throw new Error("Please select preference for Sports Secretary");
    }
  }
}

function generateString1(post, poll, category, totalCandidates, { result }) {
  let finalString;
  console.log(result);
  if (poll == "Institute") {
    finalString = "1";
  } else if (poll == "Hostel") {
    finalString = "2";
  } else if (poll == "Department") {
    finalString = "3";
    finalString = finalString.concat(category);
    if(post == "DEPARTMENT LEGISLATOR (ACADEMIC)"){
      finalString = finalString.concat("BT");
    } else {
      finalString = finalString.concat("PD");
    }
  } else if (poll == "MTECH LEGISLATORS") {
    finalString = "4MT"
  }
    if (poll == "Hostel") {
      finalString = finalString.concat(hostelMap.get(category));
      console.log("Category: ", category, "finalstring: ", finalString);
    }
  if(poll == "Hostel" || poll == "Institute"){
    finalString = finalString.concat(pollMap.get(post));
  }
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
function handleClick( // vote function handler for the frontend
  e,
  {
    hostel,
    rollNo,
    course,
    department,
    departmentLegislator,
    departmentTotalCandidates,
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
    setHasVoted,
    navigate,
    setLoggedIn,
    residencyType,
    confirmVote,
    setConfirmVote
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
      hostelSGSTotalCandidates,
      hostelHHS,
      hostelHHSTotalCandidates,
      hostelHL,
      hostelHLTotalCandidates,
      hostelLL,
      hostelLLTotalCandidates,
      hostelSL,
      hostelSLTotalCandidates,
      hostelSS,
      hostelSSTotalCandidates,
      hostelTAS,
      hostelTASTotalCandidates,
      setFormError,
      residencyType,
      departmentLegislator,
      departmentTotalCandidates
    });
    let resultArr = [];
    let result = instiAAS;
    const instiAASString = generateString1(
      "Academic Affairs Secretary",
      "Institute",
      "Institute",
      instiAASTotalCandidates,
      { result }
    );
    resultArr.push(instiAASString)

    result = instiCOCAS;
    const instiCOCASString = generateString1(
      "Co Curricular Affairs Secretary",
      "Institute",
      "Institute",
      instiCOCASTotalCandidates,
      { result }
    );
    resultArr.push(instiCOCASString);

    result = instiCULSECA;
    const instiCULSECAString = generateString1(
      "Cultural Affairs Secretary (Arts)",
      "Institute",
      "Institute",
      instiCULSECATotalCandidates,
      { result }
    );
    resultArr.push(instiCULSECAString);

    result = instiCULSECL;
    const instiCULSECLString = generateString1(
      "Cultural Affairs Secretary (Literary)",
      "Institute",
      "Institute",
      instiCULSECLTotalCandidates,
      { result }
    );
    resultArr.push(instiCULSECLString);

    result = instiHAS;
    const instiHASString = generateString1(
      "Hostel Affairs Secretary",
      "Institute",
      "Institute",
      instiHASTotalCandidates,
      { result }
    );
    resultArr.push(instiHASString);

    result = instiIAR;
    const instiIARString = generateString1(
      "International and Alumni Relations Secretary",
      "Institute",
      "Institute",
      instiIARTotalCandidates,
      { result }
    );
    resultArr.push(instiIARString);

    result = instiSS;
    const instiSSString = generateString1(
      "Sports Secretary (Institute)",
      "Institute",
      "Institute",
      instiSSTotalCandidates,
      { result }
    );
    resultArr.push(instiSSString);

    result = instiSGS;
    const instiSGSString = generateString1(
      "Students General Secretary",
      "Institute",
      "Institute",
      instiSGSTotalCandidates,
      { result }
    );
    resultArr.push(instiSGSString);

    if (residencyType == "H") {
      if (hostelSGSTotalCandidates > 0) {
        result = hostelSGS;
        const hostelSGSString = generateString1(
          "General Secretary (Hostel)",
          "Hostel",
          hostel,
          hostelSGSTotalCandidates,
          { result }
        );
        resultArr.push(hostelSGSString);
      }

      if (hostelSSTotalCandidates > 0) {
        result = hostelSS;
        const hostelSSString = generateString1(
          "Sports Secretary (Hostel)",
          "Hostel",
          hostel,
          hostelSSTotalCandidates,
          { result }
        );
        resultArr.push(hostelSSString);
      }

      if (hostelLLTotalCandidates > 0) {
        result = hostelLL;
        const hostelLLString = generateString1(
          "Literary Secretary",
          "Hostel",
          hostel,
          hostelLLTotalCandidates,
          { result }
        );
        resultArr.push(hostelLLString);
      }

      if (hostelSLTotalCandidates > 0) {
        result = hostelSL;
        const hostelSLString = generateString1(
          "Social Secretary",
          "Hostel",
          hostel,
          hostelSLTotalCandidates,
          { result }
        );
        resultArr.push(hostelSLString);
      }

      if (hostelTASTotalCandidates > 0) {
        result = hostelTAS;
        const hostelTASString = generateString1(
          "Technical Affairs Secretary",
          "Hostel",
          hostel,
          hostelTASTotalCandidates,
          { result }
        );
        resultArr.push(hostelTASString);

      }
      if (hostelHLTotalCandidates > 0) {
        result = hostelHL;
        const hostelHLString = generateString1(
          "Hostel Legislator",
          "Hostel",
          hostel,
          hostelHLTotalCandidates,
          { result }
        );
        resultArr.push(hostelHLString);
      }

      if (hostelHHSTotalCandidates > 0) {
        result = hostelHHS;
        const hostelHHSString = generateString1(
          "Health and Hygiene Secretary",
          "Hostel",
          hostel,
          hostelHHSTotalCandidates,
          { result }
        );
        resultArr.push(hostelHHSString);
      }

    }
    if (departmentTotalCandidates > 0) {
      result = departmentLegislator;
      let departmentLegislatorString;
      if (course == "B.Tech" || course == "DD" || course == "M.Sc" || course == "MBA" || course == "MA") {
        departmentLegislatorString = generateString1(
          "DEPARTMENT LEGISLATOR (ACADEMIC)",
          "Department",
          department,
          departmentTotalCandidates,
          {result}
        );
        resultArr.push(departmentLegislatorString);
      } else if (course == "M.Tech") {
        departmentLegislatorString = generateString1(
          "MTECH LEGISLATORS",
          "MTECH LEGISLATORS",
          "MTECH LEGISLATORS",
          departmentTotalCandidates,
          { result }
        );
        resultArr.push(departmentLegislatorString);
      }
      else {
        departmentLegislatorString = generateString1(
          "DEPARTMENT LEGISLATOR (RESEARCH)",
          "Department",
          department,
          departmentTotalCandidates,
          {result}
        );
        resultArr.push(departmentLegislatorString);
      }

    }
    let userId = "user1";
    let ballotObject = {
      userId: userId,
      votes: resultArr,
    };

    fetch('http://localhost:3002/api/ballots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ballotObject)
    })
    .then(response => response.json())
    .then(data => {
      if(data != "1"){
        setFormError("Something went wrong!")
        throw new Error("Something went wrong")
      }
    })
      .catch(error => console.error(error));
    setHasVoted(true);
    const requestBody = {
      query: `
                query{
                  studentVoted(rollNo: "${rollNo}") {
                    hasVoted
                  }
                }
      `
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status != 200 && res.status != 201) {
        throw new Error("Failed");
      }
      return res.json();
    })
    setLoggedIn(false);
    navigate("/thankyou");
  } catch (error) {
    console.log(error);
  }
}

function Home() {
  const setHasVoted = useContextStore((state) => state.setHasVoted);
  const setLoggedIn = useContextStore((state) => state.setLoggedIn);
  const navigate = useNavigate();
  const residencyType = useContextStore((state) => state.residencyType);
  const [formError, setFormError] = useState(null);
  const rollNo = useContextStore((state) => state.rollNo);
  const department = useContextStore((state) => state.department);
  const course = useContextStore((state) => state.course);
  const hostel = useContextStore((state) => state.hostel);
  const token = useContextStore((state) => state.token);
  const instiAAS = useVoteStore((state) => state.instiAAS);
  const setInstiAAS = useVoteStore((state) => state.setInstiAAS);
  const instiRAS = useVoteStore((state) => state.instiRAS);
  const setInstiRAS = useVoteStore((state) => state.setInstiRAS);
  const instiCOCAS = useVoteStore((state) => state.instiCOCAS);
  const setInstiCOCAS = useVoteStore((state) => state.setInstiCOCAS);
  const instiCULSECA = useVoteStore((state) => state.instiCULSECA);
  const setInstiCULSECA = useVoteStore((state) => state.setInstiCULSECA);
  const instiCULSECL = useVoteStore((state) => state.instiCULSECL);
  const setInstiCULSECL = useVoteStore((state) => state.setInstiCULSECL);
  const instiHAS = useVoteStore((state) => state.instiHAS);
  const setInstiHAS = useVoteStore((state) => state.setInstiHAS);
  const instiIAR = useVoteStore((state) => state.instiIAR);
  const setInstiIAR = useVoteStore((state) => state.setInstiIAR);
  const instiSS = useVoteStore((state) => state.instiSS);
  const setInstiSS = useVoteStore((state) => state.setInstiSS);
  const instiSGS = useVoteStore((state) => state.instiSGS);
  const setInstiSGS = useVoteStore((state) => state.setInstiSGS);
  const hostelSGS = useVoteStore((state) => state.hostelSGS);
  const setHostelSGS = useVoteStore((state) => state.setHostelSGS);
  const hostelHHS = useVoteStore((state) => state.hostelHHS);
  const setHostelHHS = useVoteStore((state) => state.setHostelHHS);
  const hostelSS = useVoteStore((state) => state.hostelSS);
  const setHostelSS = useVoteStore((state) => state.setHostelSS);
  const hostelLL = useVoteStore((state) => state.hostelLL);
  const setHostelLL = useVoteStore((state) => state.setHostelLL);
  const hostelSL = useVoteStore((state) => state.hostelSL);
  const setHostelSL = useVoteStore((state) => state.setHostelSL);
  const hostelHL = useVoteStore((state) => state.hostelHL);
  const setHostelHL = useVoteStore((state) => state.setHostelHL);
  const hostelTAS = useVoteStore((state) => state.hostelTAS);
  const setHostelTAS = useVoteStore((state) => state.setHostelTAS);
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
  const [departmentTotalCandidates, setDepartmentTotalCandidates] = useState();
  const departmentLegislator = useVoteStore((state) => state.departmentLegislator);
  const setDepartmentLegislator = useVoteStore((state) => state.setDepartmentLegislator);
  const setInstiSGSPreferences = useVoteStore(
    (state) => state.setInstiSGSPreferences
  );
  const setInstiAASPreferences = useVoteStore(
    (state) => state.setInstiAASPreferences
  );
  const setInstiRASPreferences = useVoteStore(
    (state) => state.setInstiRASPreferences
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
  const setDepartmentPreferences = useVoteStore(
    (state) => state.setDepartmentPreferences
  );
  useEffect(() => {
    loadCandidates({
      hostel,
      course,
      department,
      token,
      instiAASCandidates,
      setInstiAAS,
      setDepartmentLegislator,
      setInstiAASCandidates,
      setInstiAASTotalCandidates,
      setDepartmentTotalCandidates,
      instiRASCandidates,
      setInstiRAS,
      setInstiRASCandidates,
      setInstiRASTotalCandidates,
      instiCOCASCandidates,
      setInstiCOCAS,
      setInstiCOCASTotalCandidates,
      setInstiCOCASCandidates,
      instiCULSECACandidates,
      setInstiCULSECA,
      setInstiCULSECATotalCandidates,
      setInstiCULSECACandidates,
      instiCULSECLCandidates,
      setInstiCULSECL,
      setInstiCULSECLCandidates,
      setInstiCULSECLTotalCandidates,
      instiHASCandidates,
      setInstiHAS,
      setInstiHASCandidates,
      setInstiHASTotalCandidates,
      instiIARCandidates,
      setInstiIAR,
      setInstiIARCandidates,
      setInstiIARTotalCandidates,
      instiSSCandidates,
      setInstiSS,
      setInstiSSCandidates,
      setInstiSSTotalCandidates,
      instiSGSCandidates,
      setInstiSGS,
      setInstiSGSCandidates,
      setInstiSGSTotalCandidates,
      hostelSGSCandidates,
      setHostelSGS,
      setHostelSGSCandidates,
      setHostelSGSTotalCandidates,
      hostelHHSCandidates,
      setHostelHHS,
      setHostelHHSCandidates,
      setHostelHHSTotalCandidates,
      hostelSSCandidates,
      setHostelSS,
      setHostelSSCandidates,
      setHostelSSTotalCandidates,
      hostelSLCandidates,
      setHostelSL,
      setHostelSLCandidates,
      setHostelSLTotalCandidates,
      hostelLLCandidates,
      setHostelLL,
      setHostelLLCandidates,
      setHostelLLTotalCandidates,
      hostelTASCandidates,
      setHostelTAS,
      setHostelTASCandidates,
      setHostelTASTotalCandidates,
      hostelHLCandidates,
      setHostelHL,
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
      setDepartmentPreferences,
      
    });
  }, []);
  return (
    <>
      <Image src={header}></Image>
      <Box className="navbar" bg="black" w="100%" p={6} color="white" fontSize="xl">
 
          <Center>
            <Text fontSize="xl" as='b'>Welcome {rollNo}!</Text>
          </Center>

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
          bg="black"
          color="#ffdf58"
          onClick={(e) =>
            handleClick(e, {
              hostel,
              rollNo,
              course,
              department,
              departmentLegislator,
              departmentTotalCandidates,
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
              setHasVoted,
              navigate,
              setLoggedIn,
              residencyType,
            })
          }
        >
          Vote
        </Button>
      </Center>
      <br></br>
      <div>

      </div>
      <div className={formError == null ? "hide" : ""}>
        <Center>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{formError}</AlertTitle>
          </Alert>
        </Center>
      </div>
      <br></br>
      <Box className="navbar" bg="black" w="100%" p={4} color="white">
        <Center>
          <VStack>
            <Text fontSize="lg">Made with ❤</Text>
            <Text fontSize="lg">Devansh Saini & Anirudh Varna</Text>
            <Text fontSize="lg" color="#fec901">
              © Webops and Blockchain Club, IIT Madras
            </Text>
          </VStack>
        </Center>
      </Box>
    </>
  );
}

export default Home;
