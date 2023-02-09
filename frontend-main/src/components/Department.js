import React from "react";
import { Center, Heading, HStack } from "@chakra-ui/react";
import Reject from "./Reject/Reject";
import Abstain from "./Abstain/Abstain";
import OneCandidateCard from "./OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "./ManyCandidateCard/ManyCandidateCard";
function Department({ departmentCandidates, course }) {
  return (
    <div className="department">
      <Center>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Department Legislator
        </Heading>
      </Center>
      <br></br>
      <HStack spacing="150px">
        {departmentCandidates.map((candidate) => {
          if (candidate.category === course) {
            if (candidate.competition === false) {
              return (
                <OneCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                />
              );
            } else {
              return (
                <ManyCandidateCard
                  name={candidate.name}
                  rollNo={candidate.rollNo}
                  picture={candidate.picture}
                />
              );
            }
          } else {
            return <></>;
          }
        })}
        <Abstain />
        <Reject />
      </HStack>
    </div>
  );
}

export default Department;
