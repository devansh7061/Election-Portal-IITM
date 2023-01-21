import React, {useState} from "react";
import { Center, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import Reject from "./Reject";
import Abstain from "./Abstain";
import OneCandidateCard from "./oneCandidateCard";
import ManyCandidateCard from "./ManyCandidateCard";

let preferences = [1, 2, 3];
function Hostel({ hostelCandidates, hostelPosts }) {
  return (
    <div className="hostel">
      <Center>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Hostel Elections
        </Heading>
      </Center>
      <br></br>
      {hostelPosts.map((post) => {
        return (
          <>
            <Center>
              <Heading as="h2" size="xl" noOfLines={1}>
                {post}
              </Heading>
            </Center>
            <br></br>
            <Wrap>
              {hostelCandidates.map((candidate) => {
                if (candidate.post === post) {
                  if (candidate.competition === false) {
                    return (
                      <WrapItem>
                        <OneCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                          picture={candidate.picture}
                        />
                      </WrapItem>
                    );
                  } else {
                    return (
                      <WrapItem>
                        <ManyCandidateCard
                          name={candidate.name}
                          rollNo={candidate.rollNo}
                          picture={candidate.picture}
                          preferences={preferences}
                        />
                      </WrapItem>
                    );
                  }
                } else {
                  return <></>;
                }
              })}
              <Abstain />
              <Reject />
            </Wrap>
            <br></br>
          </>
        );
      })}
    </div>
  );
}

export default Hostel;
