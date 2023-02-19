import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiIAR.css";

function InstiIAR({ instiIARCandidates }) {
  console.log(instiIARCandidates);
  const totalCandidates = instiIARCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiIAR = useVoteStore((state) => state.instiIAR);
  const setInstiIAR = useVoteStore((state) => state.setInstiIAR);
  const instiIARPreferences = useVoteStore(
    (state) => state.instiIARPreferences
  );
  const setInstiIARPreferences = useVoteStore(
    (state) => state.setInstiIARPreferences
  );
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          International and Alumni Relations Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiIARCandidates.map((candidate,i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiIARPreferences}
                setPreferences={setInstiIARPreferences}
                variable={instiIAR}
                setVariable={setInstiIAR}
                index={i}
              />
            );
          })}
          <Abstain variable={instiIAR} setVariable={setInstiIAR} />
          <Reject variable={instiIAR} setVariable={setInstiIAR} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiIARCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiIAR}
                setVariable={setInstiIAR}
                index={i}
              />
            );
          })}
          <Abstain variable={instiIAR} setVariable={setInstiIAR} />
          <Reject variable={instiIAR} setVariable={setInstiIAR} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiIAR;
