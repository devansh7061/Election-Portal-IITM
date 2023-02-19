import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelSGS.css";

function HostelSGS({ hostelSGSCandidates }) {
  const totalCandidates = hostelSGSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelSGS = useVoteStore((state) => state.hostelSGS);
  const setHostelSGS = useVoteStore((state) => state.setHostelSGS);
  const hostelSGSPreferences = useVoteStore((state) => state.hostelSGSPreferences);
  const setHostelSGSPreferences = useVoteStore((state) => state.setHostelSGSPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          General Secretary (Hostel)
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {hostelSGSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={hostelSGSPreferences}
                setPreferences={setHostelSGSPreferences}
                variable={hostelSGS}
                setVariable={setHostelSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSGS} setVariable={setHostelSGS} />
          <Reject variable={hostelSGS} setVariable={setHostelSGS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {hostelSGSCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelSGS}
                setVariable={setHostelSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSGS} setVariable={setHostelSGS} />
          <Reject variable={hostelSGS} setVariable={setHostelSGS} />
        </HStack>
      </div>
    </div>
  );
}

export default HostelSGS;
