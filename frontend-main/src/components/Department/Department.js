import React from "react";
import { Center, Heading, Box } from "@chakra-ui/react";
import AcademicLegislator from "./AcademicLegislator/AcademicLegislator";
import ResearchLegislator from "./ResearchLegislator/ResearchLegislator";
import MTechLegislator from "./MTechLegislator/MTechLegislator";
import useContextStore from "../../store/contextStore";
function Department({ departmentCandidates, course }) {
  let studentCategory;
  if (course == "MS" || course == "Ph.D") {
    studentCategory = "Research";
  } else if (course == "M.Tech") {
    studentCategory = "M.Tech";
  } else {
    studentCategory = "Academic";
  }
  const department = useContextStore((state) => state.department);
  return (
    <div className="department">
      <Box bg="black" marginTop="50px">
        <Center>
          <Heading as="h1" size="4xl" noOfLines={1} color="#ffdf58">
            Department Elections- {department}
          </Heading>
        </Center>
      </Box>
      {studentCategory == "Academic" && (
        <AcademicLegislator departmentCandidates={departmentCandidates} />
      )}
      {studentCategory == "Research" && (
        <ResearchLegislator departmentCandidates={departmentCandidates} />
      )}
      {studentCategory == "M.Tech" && (
        <MTechLegislator departmentCandidates={departmentCandidates} />
      )}
    </div>
  );
}

export default Department;
