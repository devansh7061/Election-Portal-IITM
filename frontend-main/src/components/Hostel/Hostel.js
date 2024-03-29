import React, { useState } from "react";
import { Box, Center, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import HostelSGS from "./HostelSGS/HostelSGS";
import HostelSS from "./HostelSS/HostelSS";
import HostelHHS from "./HostelHHS/HostelHHS";
import HostelHL from "./HostelHL/HostelHL";
import HostelLL from "./HostelLL/HostelLL";
import HostelSL from "./HostelSL/HostelSL";
import HostelTAS from "./HostelTAS/HostelTAS";
import useContextStore from "../../store/contextStore";

function Hostel({ hostelSGSCandidates, hostelSSCandidates, hostelHHSCandidates, hostelHLCandidates, hostelLLCandidates, hostelSLCandidates, hostelTASCandidates }) {
  const hostel = useContextStore((state) => state.hostel);
  return (
    <div className="hostel">
      <Box bg="black" marginTop="50px">
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1} color="#ffdf58">
            Hostel Elections- {hostel}
          </Heading>
        </Center>
      </Box>
      {hostelSGSCandidates.length > 0 && (
        <HostelSGS hostelSGSCandidates={hostelSGSCandidates} />
      )}
      {hostelSSCandidates.length > 0 && (
        <HostelSS hostelSSCandidates={hostelSSCandidates} />
      )}
      {hostelHHSCandidates.length > 0 && (
        <HostelHHS hostelHHSCandidates={hostelHHSCandidates} />
      )}
      {hostelHLCandidates.length > 0 && (
        <HostelHL hostelHLCandidates={hostelHLCandidates} />
      )}
      {hostelLLCandidates.length > 0 && (
        <HostelLL hostelLLCandidates={hostelLLCandidates} />
      )}
      {hostelSLCandidates.length > 0 && (
        <HostelSL hostelSLCandidates={hostelSLCandidates} />
      )}
      {hostelTASCandidates.length > 0 && (
        <HostelTAS hostelTASCandidates={hostelTASCandidates} />
      )}
    </div>
  );
}

export default Hostel;
