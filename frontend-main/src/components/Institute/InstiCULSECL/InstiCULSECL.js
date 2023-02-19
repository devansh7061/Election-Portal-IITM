import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiCULSECL.css";

function InstiCULSECL({ instiCULSECLCandidates }) {
  const totalCandidates = instiCULSECLCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiCULSECL = useVoteStore((state) => state.instiCULSECL);
  const setInstiCULSECL = useVoteStore((state) => state.setInstiCULSECL);
  const instiCULSECLPreferences = useVoteStore(
    (state) => state.instiCULSECLPreferences
  );
  const setInstiCULSECLPreferences = useVoteStore(
    (state) => state.setInstiCULSECLPreferences
  );
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Cultural Affairs Secretary (Literary)
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiCULSECLCandidates.map((candidate,i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiCULSECLPreferences}
                setPreferences={setInstiCULSECLPreferences}
                variable={instiCULSECL}
                setVariable={setInstiCULSECL}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCULSECL} setVariable={setInstiCULSECL} />
          <Reject variable={instiCULSECL} setVariable={setInstiCULSECL} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiCULSECLCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiCULSECL}
                setVariable={setInstiCULSECL}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCULSECL} setVariable={setInstiCULSECL} />
          <Reject variable={instiCULSECL} setVariable={setInstiCULSECL} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiCULSECL;
