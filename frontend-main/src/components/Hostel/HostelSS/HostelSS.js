import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelSS.css";

function HostelSS({ hostelSSCandidates }) {
  const totalCandidates = hostelSSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelSS = useVoteStore((state) => state.hostelSS);
  const setHostelSS = useVoteStore((state) => state.setHostelSS);
  const hostelSSPreferences = useVoteStore((state) => state.hostelSSPreferences);
  const setHostelSSPreferences = useVoteStore((state) => state.setHostelSSPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Social Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {hostelSSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={hostelSSPreferences}
                setPreferences={setHostelSSPreferences}
                variable={hostelSS}
                setVariable={setHostelSS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSS} setVariable={setHostelSS} />
          <Reject variable={hostelSS} setVariable={setHostelSS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {hostelSSCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelSS}
                setVariable={setHostelSS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSS} setVariable={setHostelSS} />
          <Reject variable={hostelSS} setVariable={setHostelSS} />
        </HStack>
      </div>
    </div>
  );
}

export default HostelSS;
