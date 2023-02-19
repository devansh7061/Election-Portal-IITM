import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelSL.css";

function HostelSL({ hostelSLCandidates }) {
  const totalCandidates = hostelSLCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelSL = useVoteStore((state) => state.hostelSL);
  const setHostelSL = useVoteStore((state) => state.setHostelSL);
  const hostelSLPreferences = useVoteStore((state) => state.hostelSLPreferences);
  const setHostelSLPreferences = useVoteStore((state) => state.setHostelSLPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Sports Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {hostelSLCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={hostelSLPreferences}
                setPreferences={setHostelSLPreferences}
                variable={hostelSL}
                setVariable={setHostelSL}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSL} setVariable={setHostelSL} />
          <Reject variable={hostelSL} setVariable={setHostelSL} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {hostelSLCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelSL}
                setVariable={setHostelSL}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSL} setVariable={setHostelSL} />
          <Reject variable={hostelSL} setVariable={setHostelSL} />
        </HStack>
      </div>
    </div>
  );
}

export default HostelSL;
