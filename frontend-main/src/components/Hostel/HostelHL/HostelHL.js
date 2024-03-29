import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelHL.css";
import useContextStore from "../../../store/contextStore";

function HostelHL({ hostelHLCandidates }) {
  const totalCandidates = hostelHLCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelHL = useVoteStore((state) => state.hostelHL);
  const setHostelHL = useVoteStore((state) => state.setHostelHL);
  const hostelHLPreferences = useVoteStore((state) => state.hostelHLPreferences);
  const setHostelHLPreferences = useVoteStore((state) => state.setHostelHLPreferences);
  const hostel = useContextStore((state) => state.hostel);

  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Hostel Legislator- {hostel}
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {hostelHLCandidates.map((candidate, i) => {
            return (
              <>
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={hostelHLPreferences}
                  setPreferences={setHostelHLPreferences}
                  variable={hostelHL}
                  setVariable={setHostelHL}
                  index={i}
                />
                <Spacer />
              </>
            );
          })}
          <Abstain variable={hostelHL} setVariable={setHostelHL} />
          <Spacer />
          <Reject variable={hostelHL} setVariable={setHostelHL} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
          <HStack spacing="150px">
            {hostelHLCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={hostelHL}
                  setVariable={setHostelHL}
                  index={i}
                />
              );
            })}
            <Abstain variable={hostelHL} setVariable={setHostelHL} />
            <Reject variable={hostelHL} setVariable={setHostelHL} />
          </HStack>
        </Center>
      </div>
    </div>
  );
}

export default HostelHL;
