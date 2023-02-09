import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiCULSECA.css";

function InstiCULSECA({ instiCULSECACandidates }) {
  const totalCandidates = instiCULSECACandidates.length;
  const many = totalCandidates > 2 ? true : false;
  const preferences = [1, 2, 3];
  const instiCULSECA = useVoteStore((state) => state.instiCULSECA);
  const setInstiCULSECA = useVoteStore((state) => state.setInstiCULSECA);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Cultural Affairs Secretary (Arts)
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiCULSECACandidates.map((candidate) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={preferences}
              />
            );
          })}
          <Abstain variable={instiCULSECA} setVariable={setInstiCULSECA} />
          <Reject variable={instiCULSECA} setVariable={setInstiCULSECA} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiCULSECACandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiCULSECA}
                setVariable={setInstiCULSECA}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCULSECA} setVariable={setInstiCULSECA} />
          <Reject variable={instiCULSECA} setVariable={setInstiCULSECA} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiCULSECA;
