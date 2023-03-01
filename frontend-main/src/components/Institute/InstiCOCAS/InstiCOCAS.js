import React from "react";
import "./InstiCOCAS.css";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack, Box } from "@chakra-ui/react";

function InstiCOCAS({ instiCOCASCandidates }) {
  const totalCandidates = instiCOCASCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiCOCAS = useVoteStore((state) => state.instiCOCAS);
  const setInstiCOCAS = useVoteStore((state) => state.setInstiCOCAS);
  const instiCOCASPreferences = useVoteStore(
    (state) => state.instiCOCASPreferences
  );
  const setInstiCOCASPreferences = useVoteStore(
    (state) => state.setInstiCOCASPreferences
  );
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Co Curricular Affairs Secretary
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiCOCASCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiCOCASPreferences}
                setPreferences={setInstiCOCASPreferences}
                variable={instiCOCAS}
                setVariable={setInstiCOCAS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiCOCAS} setVariable={setInstiCOCAS} />
          <Reject variable={instiCOCAS} setVariable={setInstiCOCAS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
          <HStack spacing="150px">
            {instiCOCASCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={instiCOCAS}
                  setVariable={setInstiCOCAS}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiCOCAS} setVariable={setInstiCOCAS} />
            <Reject variable={instiCOCAS} setVariable={setInstiCOCAS} />
          </HStack>
        </Center>
      </div>
    </div>
  );
}

export default InstiCOCAS;
