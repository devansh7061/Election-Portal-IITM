import React from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import "./InstiSGS.css";

function InstiSGS({ instiSGSCandidates }) {
  console.log(instiSGSCandidates);
  const totalCandidates = instiSGSCandidates.length;
  const many = totalCandidates > 1 ? true : false;
  const instiSGS = useVoteStore((state) => state.instiSGS);
  const setInstiSGS = useVoteStore((state) => state.setInstiSGS);
  const instiSGSPreferences = useVoteStore((state) => state.instiSGSPreferences);
  const setInstiSGSPreferences = useVoteStore((state) => state.setInstiSGSPreferences);
  return (
    <div>
      <Box bg="black" padding="8px" margin="15px 0px">
        <Center>
          <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
            Students General Secretary
          </Heading>
        </Center>
      </Box>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <HStack spacing="150px">
          {instiSGSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={instiSGSPreferences}
                setPreferences={setInstiSGSPreferences}
                variable={instiSGS}
                setVariable={setInstiSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={instiSGS} setVariable={setInstiSGS} />
          <Reject variable={instiSGS} setVariable={setInstiSGS} />
        </HStack>
      </div>
      <div className={many ? "hide" : "show"}>
        <Center>
          <HStack spacing="150px">
            {instiSGSCandidates.map((candidate, i) => {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                  variable={instiSGS}
                  setVariable={setInstiSGS}
                  index={i}
                />
              );
            })}
            <Abstain variable={instiSGS} setVariable={setInstiSGS} />
            <Reject variable={instiSGS} setVariable={setInstiSGS} />
          </HStack>
        </Center>
      </div>
    </div>
  );
}

export default InstiSGS;
