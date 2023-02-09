import React from "react";
import { Center, Heading } from "@chakra-ui/react";
import InstiAAS from "./InstiAAS/InstiAAS";
import InstiCOCAS from "./InstiCOCAS/InstiCOCAS";
import InstiCULSECA from "./InstiCULSECA/InstiCULSECA";
import InstiCULSECL from "./InstiCULSECL/InstiCULSECL";
import InstiHAS from "./InstiHAS/InstiHAS";
import InstiIAR from "./InstiIAR/InstiIAR";
import InstiSS from "./InstiSS/InstiSS";
import InstiSGS from "./InstiSGS/InstiSGS";

function Institute({
  instiAASCandidates,
  instiCOCASCandidates,
  instiCULSECACandidates,
  instiCULSECLCandidates,
  instiHASCandidates,
  instiIARCandidates,
  instiSSCandidates,
  instiSGSCandidates,
}) {
  return (
    <div className="institute">
      <Center>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Institute Elections
        </Heading>
      </Center>
      <br></br>
      <InstiAAS instiAASCandidates={instiAASCandidates} />
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