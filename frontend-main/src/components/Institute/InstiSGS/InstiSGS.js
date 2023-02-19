import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiSGS.css";

function InstiSGS({ instiSGSCandidates }) {
  console.log(instiSGSCandidates);
  const totalCandidates = instiSGSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiSGS = useVoteStore((state) => state.instiSGS);
  const setInstiSGS = useVoteStore((state) => state.setInstiSGS);
  const instiSGSPreferences = useVoteStore((state) => state.instiSGSPreferences);
  const setInstiSGSPreferences = useVoteStore((state) => state.setInstiSGSPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Students General Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiSGSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiSGSPreferences}
                setPreferences={setInstiSGSPreferences}
                variable={instiSGS}
                setVariable={setInstiSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiSGS} setVariable={setInstiSGS} />
          <Reject variable={instiSGS} setVariable={setInstiSGS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiSGSCandidates.map((candidate,i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiSGS}
                setVariable={setInstiSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiSGS} setVariable={setInstiSGS} />
          <Reject variable={instiSGS} setVariable={setInstiSGS} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiSGS;
