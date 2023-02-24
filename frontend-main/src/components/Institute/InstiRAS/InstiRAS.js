import React from 'react'
import Abstain from '../../Abstain/Abstain';
import Reject from '../../Reject/Reject';
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiRAS.css"

function InstiRAS({instiRASCandidates}) {
    const totalCandidates = instiRASCandidates.length;
    const many = (totalCandidates > 1) ? true : false;
    const instiRAS = useVoteStore((state) => state.instiRAS);
    const setInstiRAS = useVoteStore((state) => state.setInstiRAS);
    const instiRASPreferences = useVoteStore(
      (state) => state.instiRASPreferences
    );
    const setInstiRASPreferences = useVoteStore(
      (state) => state.setInstiRASPreferences
    );
    return (
      <div>
        <Center>
          <Heading as="h2" size="xl" noOfLines={1}>
            Research Affairs Secretary
          </Heading>
        </Center>
        <br></br>
        <div className={many ? "show" : "hide"}>
          <HStack spacing="150px">
            {instiRASCandidates.map((candidate, i) => {
              return (
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={instiRASPreferences}
                  setPreferences={setInstiRASPreferences}
                  variable={instiRAS}
                  setVariable={setInstiRAS}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiRAS} setVariable={setInstiRAS} />
            <Reject variable={instiRAS} setVariable={setInstiRAS} />
          </HStack>
        </div>
        <div className={many ? "hide" : "show"}>
          <HStack spacing="150px">
            {instiRASCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={instiRAS}
                  setVariable={setInstiRAS}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiRAS} setVariable={setInstiRAS} />
            <Reject variable={instiRAS} setVariable={setInstiRAS} />
          </HStack>
        </div>
      </div>
    );
}

export default InstiRAS
