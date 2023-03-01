import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import "./InstiCULSECA.css";

function InstiCULSECA({ instiCULSECACandidates }) {
  const totalCandidates = instiCULSECACandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiCULSECA = useVoteStore((state) => state.instiCULSECA);
  const setInstiCULSECA = useVoteStore((state) => state.setInstiCULSECA);
  const instiCULSECAPreferences = useVoteStore(
    (state) => state.instiCULSECAPreferences
  );
  const setInstiCULSECAPreferences = useVoteStore(
    (state) => state.setInstiCULSECAPreferences
  );
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Cultural Affairs Secretary (Arts)
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {instiCULSECACandidates.map((candidate, i) => {
            return (
              <>
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={instiCULSECAPreferences}
                  setPreferences={setInstiCULSECAPreferences}
                  variable={instiCULSECA}
                  setVariable={setInstiCULSECA}
                  index={i}
                />
                <Spacer />
              </>
            );
          })}
          <Abstain variable={instiCULSECA} setVariable={setInstiCULSECA} />
          <Spacer />
          <Reject variable={instiCULSECA} setVariable={setInstiCULSECA} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiCULSECACandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiCULSECA}
                setVariable={setInstiCULSECA}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCULSECA} setVariable={setInstiCULSECA} />
          <Reject variable={instiCULSECA} setVariable={setInstiCULSECA} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiCULSECA;
