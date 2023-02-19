import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiHAS.css";

function InstiHAS({ instiHASCandidates }) {
    console.log(instiHASCandidates);
    const totalCandidates = instiHASCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiHAS = useVoteStore((state) => state.instiHAS);
  const setInstiHAS = useVoteStore((state) => state.setInstiHAS);
  const instiHASPreferences = useVoteStore(
    (state) => state.instiHASPreferences
  );
  const setInstiHASPreferences = useVoteStore(
    (state) => state.setInstiHASPreferences
  );
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Hostel Affairs Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiHASCandidates.map((candidate,i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiHASPreferences}
                setPreferences={setInstiHASPreferences}
                variable={instiHAS}
                setVariable={setInstiHAS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiHAS} setVariable={setInstiHAS} />
          <Reject variable={instiHAS} setVariable={setInstiHAS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiHASCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiHAS}
                setVariable={setInstiHAS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiHAS} setVariable={setInstiHAS} />
          <Reject variable={instiHAS} setVariable={setInstiHAS} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiHAS;
