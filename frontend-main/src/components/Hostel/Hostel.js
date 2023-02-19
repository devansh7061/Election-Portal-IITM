import React, { useState } from "react";
import { Center, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import HostelSGS from "./HostelSGS/HostelSGS";
import HostelSS from "./HostelSS/HostelSS";
import HostelHHS from "./HostelHHS/HostelHHS";
import HostelHL from "./HostelHL/HostelHL";
import HostelLL from "./HostelLL/HostelLL";
import HostelSL from "./HostelSL/HostelSL";
import HostelTAS from "./HostelTAS/HostelTAS";

function Hostel({ hostelSGSCandidates, hostelSSCandidates, hostelHHSCandidates, hostelHLCandidates, hostelLLCandidates, hostelSLCandidates, hostelTASCandidates }) {
  return (
    <div className="hostel">
      <Center>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Hostel Elections
        </Heading>
      </Center>
      <br></br>
      <HostelSGS hostelSGSCandidates={hostelSGSCandidates} />
      <HostelSS hostelSSCandidates={hostelSSCandidates}></HostelSS>
      <HostelHHS hostelHHSCandidates={hostelHHSCandidates} />
      <HostelHL hostelHLCandidates={hostelHLCandidates} />
      <HostelLL hostelLLCandidates={hostelLLCandidates} />
      <HostelSL hostelSLCandidates={hostelSLCandidates} />
      <HostelTAS hostelTASCandidates={hostelTASCandidates} />
    </div>
  );
}

export default Hostel;
