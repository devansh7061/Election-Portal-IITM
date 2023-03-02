import React from "react";
import { Center, Heading, Box, Text } from "@chakra-ui/react";
import InstiAAS from "./InstiAAS/InstiAAS";
import InstiCOCAS from "./InstiCOCAS/InstiCOCAS";
import InstiCULSECA from "./InstiCULSECA/InstiCULSECA";
import InstiCULSECL from "./InstiCULSECL/InstiCULSECL";
import InstiHAS from "./InstiHAS/InstiHAS";
import InstiIAR from "./InstiIAR/InstiIAR";
import InstiSS from "./InstiSS/InstiSS";
import InstiSGS from "./InstiSGS/InstiSGS";
import InstiRAS from "./InstiRAS/InstiRAS";

function Institute({
  instiAASCandidates,
  instiRASCandidates,
  instiCOCASCandidates,
  instiCULSECACandidates,
  instiCULSECLCandidates,
  instiHASCandidates,
  instiIARCandidates,
  instiSSCandidates,
  instiSGSCandidates,
  course
}) {
  let studentCategory;
  if (course == "MS" || course == "Ph.D") {
    studentCategory = "Research"
  } else {
    studentCategory = "Academic"
  }
  return (
    <div className="institute">
      <Box bg="black">
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1} color="#ffdf58">
            Institute Elections
          </Heading>
        </Center>
      </Box>
      {studentCategory == "Academic" && (
        <InstiAAS instiAASCandidates={instiAASCandidates} />
      )}
      {studentCategory == "Research" && (
        <InstiRAS instiRASCandidates={instiRASCandidates} />
      )}
      <InstiCOCAS instiCOCASCandidates={instiCOCASCandidates} />
      <InstiCULSECA instiCULSECACandidates={instiCULSECACandidates} />
      <InstiCULSECL instiCULSECLCandidates={instiCULSECLCandidates} />
      <InstiHAS instiHASCandidates={instiHASCandidates} />
      <InstiIAR instiIARCandidates={instiIARCandidates} />
      <InstiSS instiSSCandidates={instiSSCandidates} />
      <InstiSGS instiSGSCandidates={instiSGSCandidates} />
    </div>
  );
}

export default Institute;
