import React from 'react'
import Abstain from '../../Abstain/Abstain';
import Reject from '../../Reject/Reject';
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard.js";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard.js";
import useVoteStore from "../../../store/voteStore";
import { Center, Heading, HStack, Box, Flex, Spacer } from "@chakra-ui/react";
import "./ResearchLegislator.css"

function ResearchLegislator({departmentCandidates}) {
    const totalCandidates = departmentCandidates.length;
    const many = (totalCandidates > 1) ? true : false;
    const departmentLegislator = useVoteStore((state) => state.dep);
    const setDepartmentLegislator = useVoteStore((state) => state.setDepartmentLegislator);
    const departmentPreferences = useVoteStore(
      (state) => state.departmentPreferences
    );
    const setDepartmentPreferences = useVoteStore(
      (state) => state.setDepartmentPreferences
    );
    return (
      <div>
        <Box bg="black" padding="8px">
          <Center>
            <Heading as="h2" size="xl" noOfLines={1} color="#ffdf58">
              DEPARTMENT LEGISLATOR (Research)
            </Heading>
          </Center>
        </Box>
        <br></br>
        <div className={many ? "show" : "hide"}>
          <Flex>
            {departmentCandidates.map((candidate, i) => {
              return (
                <>
                  <ManyCandidateCard
                    name={candidate.name}
                    rollNo={candidate.rollNo}
                    picture={candidate.picture}
                    preferences={departmentPreferences}
                    setPreferences={setDepartmentPreferences}
                    variable={departmentLegislator}
                    setVariable={setDepartmentLegislator}
                    index={i}
                  />
                  <Spacer />
                </>
              );
            })}
            <Abstain
              variable={departmentLegislator}
              setVariable={setDepartmentLegislator}
            />
            <Spacer />
            <Reject
              variable={departmentLegislator}
              setVariable={setDepartmentLegislator}
            />
          </Flex>
        </div>
        <div className={many ? "hide" : "show"}>
          <Center>
            <HStack spacing="150px">
              {departmentCandidates.map((candidate, i) => {
                return (
                  <OneCandidateCard
                    name={candidate.name}
                    rollNo={candidate.rollNo}
                    picture={candidate.picture}
                    variable={departmentLegislator}
                    setVariable={setDepartmentLegislator}
                    index={i}
                  />
                );
              })}
              <Abstain
                variable={departmentLegislator}
                setVariable={setDepartmentLegislator}
              />
              <Reject
                variable={departmentLegislator}
                setVariable={setDepartmentLegislator}
              />
            </HStack>
          </Center>
        </div>
      </div>
    );
}

export default ResearchLegislator
