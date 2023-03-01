import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelLL.css";

function HostelLL({ hostelLLCandidates }) {
  const totalCandidates = hostelLLCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelLL = useVoteStore((state) => state.hostelLL);
  const setHostelLL = useVoteStore((state) => state.setHostelLL);
  const hostelLLPreferences = useVoteStore((state) => state.hostelLLPreferences);
  const setHostelLLPreferences = useVoteStore((state) => state.setHostelLLPreferences);
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Literary Secretary
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {hostelLLCandidates.map((candidate, i) => {
            return (
              <>
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={hostelLLPreferences}
                  setPreferences={setHostelLLPreferences}
                  variable={hostelLL}
                  setVariable={setHostelLL}
                  index={i}
                />
                <Spacer />
              </>
            );
          })}
          <Abstain variable={hostelLL} setVariable={setHostelLL} />
          <Spacer />
          <Reject variable={hostelLL} setVariable={setHostelLL} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
          <HStack spacing="150px">
            {hostelLLCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={hostelLL}
                  setVariable={setHostelLL}
                  index={i}
                />
              );
            })}
            <Abstain variable={hostelLL} setVariable={setHostelLL} />
            <Reject variable={hostelLL} setVariable={setHostelLL} />
          </HStack>
        </Center>
      </div>
    </div>
  );
}

export default HostelLL;
