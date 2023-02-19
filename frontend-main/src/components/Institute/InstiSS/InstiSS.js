import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiSS.css";

function InstiSS({ instiSSCandidates }) {
  console.log(instiSSCandidates);
  const totalCandidates = instiSSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiSS = useVoteStore((state) => state.instiSS);
  const setInstiSS = useVoteStore((state) => state.setInstiSS);
  const instiSSPreferences = useVoteStore(
    (state) => state.instiSSPreferences
  );
  const setInstiSSPreferences = useVoteStore(
    (state) => state.setInstiSSPreferences
  );
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Sports Secretary (Institute)
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiSSCandidates.map((candidate,i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiSSPreferences}
                setPreferences={setInstiSSPreferences}
                variable={instiSS}
                setVariable={setInstiSS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiSS} setVariable={setInstiSS} />
          <Reject variable={instiSS} setVariable={setInstiSS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiSSCandidates.map((candidate,i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiSS}
                setVariable={setInstiSS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiSS} setVariable={setInstiSS} />
          <Reject variable={instiSS} setVariable={setInstiSS} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiSS;
