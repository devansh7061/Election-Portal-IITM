import React from "react";
import { Center, Heading, HStack } from "@chakra-ui/react";
import Reject from "./Reject";
import Abstain from "./Abstain";
import OneCandidateCard from "./oneCandidateCard";
import ManyCandidateCard from "./ManyCandidateCard";

const preferences = [1, 2, 3];
function Institute({ institutePosts, instituteCandidates }) {
  return (
    <div className="institute">
      <Center>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Institute Elections
        </Heading>
      </Center>
      <br></br>
      {institutePosts.map((post) => {
        return (
          <>
            <Center>
              <Heading as="h2" size="xl" noOfLines={1}>
                {post}
              </Heading>
            </Center>
            <br></br>
            <HStack spacing="150px">
              {instituteCandidates.map((candidate) => {
                if (candidate.post === post) {
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
          </>
        );
      })}
    </div>
  );
}

export default Institute;
