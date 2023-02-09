import React from "react";
import "./InstiCOCAS.css";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";

function InstiCOCAS({ instiCOCASCandidates }) {
  const totalCandidates = instiCOCASCandidates.length;
  const many = totalCandidates > 2 ? true : false;
  const preferences = [1, 2, 3];
  const instiCOCAS = useVoteStore((state) => state.instiCOCAS);
  const setInstiCOCAS = useVoteStore((state) => state.setInstiCOCAS);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Co Curricular Affairs Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiCOCASCandidates.map((candidate) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={preferences}
              />
            );
          })}
          <Abstain variable={instiCOCAS} setVariable={setInstiCOCAS} />
          <Reject variable={instiCOCAS} setVariable={setInstiCOCAS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiCOCASCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiCOCAS}
                setVariable={setInstiCOCAS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCOCAS} setVariable={setInstiCOCAS} />
          <Reject variable={instiCOCAS} setVariable={setInstiCOCAS} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiCOCAS;
