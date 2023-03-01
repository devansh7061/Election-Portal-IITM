import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelTAS.css";

function HostelTAS({ hostelTASCandidates }) {
  const totalCandidates = hostelTASCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelTAS = useVoteStore((state) => state.hostelTAS);
  const setHostelTAS = useVoteStore((state) => state.setHostelTAS);
  const hostelTASPreferences = useVoteStore((state) => state.hostelTASPreferences);
  const setHostelTASPreferences = useVoteStore((state) => state.setHostelTASPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Technical Affairs Secretary
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {hostelTASCandidates.map((candidate, i) => {
            return (
              <>
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={hostelTASPreferences}
                  setPreferences={setHostelTASPreferences}
                  variable={hostelTAS}
                  setVariable={setHostelTAS}
                  index={i}
                />
                <Spacer />
              </>
            );
          })}
          <Abstain variable={hostelTAS} setVariable={setHostelTAS} />
          <Spacer />
          <Reject variable={hostelTAS} setVariable={setHostelTAS} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {hostelTASCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelTAS}
                setVariable={setHostelTAS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelTAS} setVariable={setHostelTAS} />
          <Reject variable={hostelTAS} setVariable={setHostelTAS} />
        </HStack>
      </div>
    </div>
  );
}

export default HostelTAS;
