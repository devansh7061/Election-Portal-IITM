import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelHHS.css";

function HostelHHS({ hostelHHSCandidates }) {
  const totalCandidates = hostelHHSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelHHS = useVoteStore((state) => state.hostelHHS);
  const setHostelHHS = useVoteStore((state) => state.setHostelHHS);
  const hostelHHSPreferences = useVoteStore((state) => state.hostelHHSPreferences);
  const setHostelHHSPreferences = useVoteStore((state) => state.setHostelHHSPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Health and Hygiene Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {hostelHHSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={hostelHHSPreferences}
                setPreferences={setHostelHHSPreferences}
                variable={hostelHHS}
                setVariable={setHostelHHS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelHHS} setVariable={setHostelHHS} />
          <Reject variable={hostelHHS} setVariable={setHostelHHS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {hostelHHSCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelHHS}
                setVariable={setHostelHHS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelHHS} setVariable={setHostelHHS} />
          <Reject variable={hostelHHS} setVariable={setHostelHHS} />
        </HStack>
      </div>
    </div>
  );
}

export default HostelHHS;
