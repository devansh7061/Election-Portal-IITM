import React from 'react'
import Abstain from '../../Abstain/Abstain';
import Reject from '../../Reject/Reject';
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiAAS.css"

function InstiAAS({instiAASCandidates}) {
    const totalCandidates = instiAASCandidates.length;
    const many = (totalCandidates > 2) ? true : false;
    const preferences = [1, 2, 3];
    const instiAAS = useVoteStore((state) => state.instiAAS);
    const setInstiAAS = useVoteStore((state) => state.setInstiAAS);
    return (
      <div>
        <Center>
          <Heading as="h2" size="xl" noOfLines={1}>
            Academic Affairs Secretary
          </Heading>
        </Center>
        <br></br>
        <div className={many ? "show" : "hide"}>
          <HStack spacing="150px">
            {instiAASCandidates.map((candidate) => {
              return (
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={preferences}
                />
              );
            })}
            <Abstain variable={instiAAS} setVariable={setInstiAAS} />
            <Reject variable={instiAAS} setVariable={setInstiAAS} />
          </HStack>
        </div>
        <div className={many ? "hide" : "show"}>
          <HStack spacing="150px">
            {instiAASCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={instiAAS}
                  setVariable={setInstiAAS}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiAAS} setVariable={setInstiAAS} />
            <Reject variable={instiAAS} setVariable={setInstiAAS} />
          </HStack>
        </div>
      </div>
    );
}

export default InstiAAS