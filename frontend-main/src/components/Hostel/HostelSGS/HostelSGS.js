import React, {useState} from "react";
import Abstain from "../../Abstain/Abstain";
import Reject from "../../Reject/Reject";
import { Center, Heading, Flex } from "@chakra-ui/react";
import OneCandidateCard from "../../OneCandidateCard/OneCandidateCard";
import ManyCandidateCard from "../../ManyCandidateCard/ManyCandidateCard";
import useVoteStore from "../../../store/voteStore";
import "./HostelSGS.css";

function HostelSGS({ hostelSGSCandidates }) {
  const totalCandidates = hostelSGSCandidates.length;
  const many = totalCandidates > 2 ? true : false;
  const [preferences, setPreferences] = useState([1, 2, 3]);
  const hostelSGS = useVoteStore((state) => state.hostelSGS);
  const setHostelSGS = useVoteStore((state) => state.setHostelSGS);
  const hostelSGSP1 = useVoteStore((state) => state.hostelSGSP1);
  const hostelSGSP2 = useVoteStore((state) => state.hostelSGSP2);
  const hostelSGSP3 = useVoteStore((state) => state.hostelSGSP3);
  const setHostelSGSP1 = useVoteStore((state) => state.setHostelSGSP1);
  const setHostelSGSP2 = useVoteStore((state) => state.setHostelSGSP2);
  const setHostelSGSP3 = useVoteStore((state) => state.setHostelSGSP3);
  return (
    <div>
      <Center>
        <Heading as="h2" size="xl" noOfLines={1}>
          General Secretary (Hostel)
        </Heading>
      </Center>
      <br></br>
      <div className={many ? "show" : "hide"}>
        <Flex spacing="150px">
          {hostelSGSCandidates.map((candidate, i) => {
            return (
              <ManyCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                preferences={preferences}
                index={i}
                p1={hostelSGSP1}
                p2={hostelSGSP2}
                p3={hostelSGSP3}
                setP1={setHostelSGSP1}
                setP2={setHostelSGSP2}
                setP3={setHostelSGSP3}
              />
            );
          })}
          <Abstain variable={hostelSGS} setVariable={setHostelSGS} />
          <Reject variable={hostelSGS} setVariable={setHostelSGS} />
        </Flex>
      </div>
      <div className={many ? "hide" : "show"}>
        <Flex spacing="150px">
          {hostelSGSCandidates.map((candidate, i) => {
            return (
              <OneCandidateCard
                name={candidate.name}
                rollNo={candidate.rollNo}
                picture={candidate.picture}
                variable={hostelSGS}
                setVariable={setHostelSGS}
                index={i}
              />
            );
          })}
          <Abstain variable={hostelSGS} setVariable={setHostelSGS} />
          <Reject variable={hostelSGS} setVariable={setHostelSGS} />
        </Flex>
      </div>
    </div>
  );
}

export default HostelSGS;
