import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack, Flex, Spacer, Box } from "@chakra-ui/react";
import "./InstiAAS.css";

function InstiAAS({ instiAASCandidates }) {
  const totalCandidates = instiAASCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiAAS = useVoteStore((state) => state.instiAAS);
  const setInstiAAS = useVoteStore((state) => state.setInstiAAS);
  const instiAASPreferences = useVoteStore(
    (state) => state.instiAASPreferences
  );
  const setInstiAASPreferences = useVoteStore(
    (state) => state.setInstiAASPreferences
  );
  console.log(instiAASPreferences, "dgegegeg");
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Academic Affairs Secretary
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex>
          {instiAASCandidates.map((candidate, i) => {
            return (
              <>
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  preferences={instiAASPreferences}
                  setPreferences={setInstiAASPreferences}
                  variable={instiAAS}
                  setVariable={setInstiAAS}
                  index={i}
                />
                <Spacer />
              </>
            );
          })}
          <Abstain variable={instiAAS} setVariable={setInstiAAS} />
          <Spacer />
          <Reject variable={instiAAS} setVariable={setInstiAAS} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <HStack spacing="150px">
          {instiAASCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={instiAAS}
                setVariable={setInstiAAS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiAAS} setVariable={setInstiAAS} />
          <Reject variable={instiAAS} setVariable={setInstiAAS} />
        </HStack>
      </div>
    </div>
  );
}

export default InstiAAS;
