import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiIAR.css";

function InstiIAR({ instiIARCandidates }) {
  console.log(instiIARCandidates);
  const totalCandidates = instiIARCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiIAR = useVoteStore((state) => state.instiIAR);
  const setInstiIAR = useVoteStore((state) => state.setInstiIAR);
  const instiIARPreferences = useVoteStore(
    (state) => state.instiIARPreferences
  );
  const setInstiIARPreferences = useVoteStore(
    (state) => state.setInstiIARPreferences
  );
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            International and Alumni Relations Secretary
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiIARCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiIARPreferences}
                setPreferences={setInstiIARPreferences}
                variable={instiIAR}
                setVariable={setInstiIAR}
                index={i}
              />
            );
          })}
          <Abstain variable={instiIAR} setVariable={setInstiIAR} />
          <Reject variable={instiIAR} setVariable={setInstiIAR} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
          <HStack spacing="150px">
            {instiIARCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={instiIAR}
                  setVariable={setInstiIAR}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiIAR} setVariable={setInstiIAR} />
            <Reject variable={instiIAR} setVariable={setInstiIAR} />
          </HStack>
        </Center>
      </div>
    </div>
  );
}

export default InstiIAR;
