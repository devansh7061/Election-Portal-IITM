import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelTAS.css";
import useContextStore from "../../../store/contextStore";
function HostelTAS({ hostelTASCandidates }) {
  const totalCandidates = hostelTASCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelTAS = useVoteStore((state) => state.hostelTAS);
  const setHostelTAS = useVoteStore((state) => state.setHostelTAS);
  const hostelTASPreferences = useVoteStore((state) => state.hostelTASPreferences);
  const setHostelTASPreferences = useVoteStore((state) => state.setHostelTASPreferences);
  const hostel = useContextStore((state) => state.hostel);
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Technical Affairs Secretary- {hostel}
          </Heading>
        </Center>
      </Box>
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
        <Center>
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
        </Center>
      </div>
    </div>
  );
}

export default HostelTAS;
