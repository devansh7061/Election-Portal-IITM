import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelHHS.css";
import useContextStore from "../../../store/contextStore";

function HostelHHS({ hostelHHSCandidates }) {
  const totalCandidates = hostelHHSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelHHS = useVoteStore((state) => state.hostelHHS);
  const setHostelHHS = useVoteStore((state) => state.setHostelHHS);
  const hostelHHSPreferences = useVoteStore((state) => state.hostelHHSPreferences);
  const setHostelHHSPreferences = useVoteStore((state) => state.setHostelHHSPreferences);
  const hostel = useContextStore((state) => state.hostel);
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Health and Hygiene Secretary- {hostel}
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {hostelHHSCandidates.map((candidate, i) => {
            return (
              <>
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
                <Spacer />
              </>
            );
          })}
          <Abstain variable={hostelHHS} setVariable={setHostelHHS} />
          <Spacer />
          <Reject variable={hostelHHS} setVariable={setHostelHHS} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
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
        </Center>
      </div>
    </div>
  );
}

export default HostelHHS;
