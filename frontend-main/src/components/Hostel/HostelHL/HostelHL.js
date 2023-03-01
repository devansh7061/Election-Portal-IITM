import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, HStack, Flex, Spacer } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelHL.css";

function HostelHL({ hostelHLCandidates }) {
  const totalCandidates = hostelHLCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const hostelHL = useVoteStore((state) => state.hostelHL);
  const setHostelHL = useVoteStore((state) => state.setHostelHL);
  const hostelHLPreferences = useVoteStore((state) => state.hostelHLPreferences);
  const setHostelHLPreferences = useVoteStore((state) => state.setHostelHLPreferences);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          Hostel Legislator
        </Heading>
      </Center>
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
      </div>
    </div>
  );
}

export default HostelHL;
