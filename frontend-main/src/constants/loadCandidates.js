function loadCandidates({
  hostel,
  department,
  course,
  token,
  instiAASCandidates,
  setInstiAAS,
  instiRASCandidates,
  setInstiRAS,
  instiCOCASCandidates,
  setInstiCOCAS,
  instiCULSECACandidates,
  setInstiCULSECA,
  instiCULSECLCandidates,
  setInstiCULSECLCandidates,
  setInstiCULSECL,
  instiHASCandidates,
  setInstiHAS,
  setInstiHASCandidates,
  instiIARCandidates,
  setInstiIAR,
  setInstiIARCandidates,
  instiSSCandidates,
  setInstiSS,
  setInstiSSCandidates,
  instiSGSCandidates,
  setInstiSGS,
  setInstiSGSCandidates,
  hostelSGSCandidates,
  setHostelSGS,
  setHostelSGSCandidates,
  setHostelSGSTotalCandidates,
  setHostelSGSPreferences,
  hostelHHSCandidates,
  setHostelHHS,
  setHostelHHSCandidates,
  setHostelHHSTotalCandidates,
  setHostelHHSPreferences,
  hostelHLCandidates,
  setHostelHL,
  setHostelHLCandidates,
  setHostelHLTotalCandidates,
  setHostelHLPreferences,
  hostelLLCandidates,
  setHostelLL,
  setHostelLLCandidates,
  setHostelLLTotalCandidates,
  setHostelLLPreferences,
  hostelSLCandidates,
  setHostelSL,
  setHostelSLCandidates,
  setHostelSLTotalCandidates,
  setHostelSLPreferences,
  hostelTASCandidates,
  setHostelTAS,
  setHostelTASCandidates,
  setHostelTASTotalCandidates,
  setHostelTASPreferences,
  hostelSSCandidates,
  setHostelSS,
  setHostelSSCandidates,
  setHostelSSTotalCandidates,
  setHostelSSPreferences,
  departmentCandidates,
  setInstiAASCandidates,
  setInstiRASCandidates,
  setInstiCULSECACandidates,
  setInstiCOCASCandidates,
  setDepartmentCandidates,
  setInstiSGSPreferences,
  setInstiAASPreferences,
  setInstiRASPreferences,
  setInstiCOCASPreferences,
  setInstiCULSECAPreferences,
  setInstiCULSECLPreferences,
  setInstiHASPreferences,
  setInstiSSPreferences,
  setInstiIARPreferences,
  setInstiAASTotalCandidates,
  setInstiRASTotalCandidates,
  setInstiCOCASTotalCandidates,
  setInstiCULSECATotalCandidates,
  setInstiCULSECLTotalCandidates,
  setInstiHASTotalCandidates,
  setInstiIARTotalCandidates,
  setInstiSSTotalCandidates,
  setInstiSGSTotalCandidates,
  setDepartmentPreferences,
  setDepartmentTotalCandidates,
  setDepartmentLegislator
}) {
  const requestBody = {
    query: `
            query {
              candidates(virtualHostel: "${hostel}", department: "${department}", program: "${course}") {
                name
                rollNo
                post
                poll
                picture
                category
              }
            }
    `,
  };
  fetch("http://localhost:5000/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((resData) => {
      resData.data.candidates.map((candidate) => {
        if (
          candidate.poll == "Institute" &&
          candidate.post == "ACADEMIC AFFAIRS SECRETARY"
        ) {
          instiAASCandidates = [...instiAASCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "RESEARCH AFFAIRS SECRETARY"
        ) {
          instiRASCandidates = [...instiRASCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "CO-CURRICULAR AFFAIRS SECRETARY"
        ) {
          instiCOCASCandidates = [...instiCOCASCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "CULTURAL AFFAIRS SECRETARY (ARTS)"
        ) {
          instiCULSECACandidates = [...instiCULSECACandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "CULTURAL AFFAIRS SECRETARY (LITERARY)"
        ) {
          instiCULSECLCandidates = [...instiCULSECLCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "HOSTEL AFFAIRS SECRETARY"
        ) {
          instiHASCandidates = [...instiHASCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "INTERNATIONAL AND ALUMNI RELATIONS SECRETARY"
        ) {
          instiIARCandidates = [...instiIARCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "SPORTS SECRETARY (INSTITUTE)"
        ) {
          instiSSCandidates = [...instiSSCandidates, candidate];
        }
        if (
          candidate.poll == "Institute" &&
          candidate.post == "STUDENTS GENERAL SECRETARY"
        ) {
          instiSGSCandidates = [...instiSGSCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "GENERAL SECRETARY"
        ) {
          hostelSGSCandidates = [...hostelSGSCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "HEALTH AND HYGIENE SECRETARY"
        ) {
          hostelHHSCandidates = [...hostelHHSCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "HOSTEL LEGISLATOR"
        ) {
          hostelHLCandidates = [...hostelHLCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "LITERARY SECRETARY"
        ) {
          hostelLLCandidates = [...hostelLLCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "SOCIAL SECRETARY"
        ) {
          hostelSLCandidates = [...hostelSLCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "SPORTS SECRETARY"
        ) {
          hostelSSCandidates = [...hostelSSCandidates, candidate];
        }
        if (
          candidate.category.toUpperCase() == hostel.toUpperCase() &&
          candidate.post == "TECHNICAL AFFAIRS SECRETARY"
        ) {
          hostelTASCandidates = [...hostelTASCandidates, candidate];
        }
        if (candidate.poll == "Department") {
          departmentCandidates = [...departmentCandidates, candidate];
        }
      });
      setInstiAASCandidates(instiAASCandidates);
      const totalInstiAASCandidates = instiAASCandidates.length;
      setInstiAASTotalCandidates(totalInstiAASCandidates);
      let instiAASPreferences = [];
      for (let i = 1; i <= totalInstiAASCandidates; i++) {
        instiAASPreferences.push({ value: i, label: i });
      }
      setInstiAASPreferences(instiAASPreferences);
      console.log("PPPPP", instiAASPreferences);
      setInstiRASCandidates(instiRASCandidates);
      const totalInstiRASCandidates = instiRASCandidates.length;
      setInstiRASTotalCandidates(totalInstiRASCandidates);
      let instiRASPreferences = [];
      for (let i = 1; i <= totalInstiRASCandidates; i++) {
        instiRASPreferences.push({ value: i, label: i });
      }
      setInstiRASPreferences(instiRASPreferences);
      setInstiCOCASCandidates(instiCOCASCandidates);
      const totalInstiCOCASCandidates = instiCOCASCandidates.length;
      setInstiCOCASTotalCandidates(totalInstiCOCASCandidates);
      let instiCOCASPreferences = [];
      for (let i = 1; i <= totalInstiCOCASCandidates; i++) {
        instiCOCASPreferences.push({ value: i, label: i });
      }
      setInstiCOCASPreferences(instiCOCASPreferences);
      setInstiCULSECACandidates(instiCULSECACandidates);
      const totalInstiCULSECACandidates = instiCULSECACandidates.length;
      setInstiCULSECATotalCandidates(totalInstiCULSECACandidates);
      let instiCULSECAPreferences = [];
      for (let i = 1; i <= totalInstiCULSECACandidates; i++) {
        instiCULSECAPreferences.push({ value: i, label: i });
      }
      setInstiCULSECAPreferences(instiCULSECAPreferences);
      setInstiCULSECLCandidates(instiCULSECLCandidates);
      const totalInstiCULSECLCandidates = instiCULSECLCandidates.length;
      setInstiCULSECLTotalCandidates(totalInstiCULSECLCandidates);
      let instiCULSECLPreferences = [];
      for (let i = 1; i <= totalInstiCULSECLCandidates; i++) {
        instiCULSECLPreferences.push({ value: i, label: i });
      }
      setInstiCULSECLPreferences(instiCULSECLPreferences);
      setInstiHASCandidates(instiHASCandidates);
      const totalInstiHASCandidates = instiHASCandidates.length;
      setInstiHASTotalCandidates(totalInstiHASCandidates);
      let instiHASPreferences = [];
      for (let i = 1; i <= totalInstiHASCandidates; i++) {
        instiHASPreferences.push({ value: i, label: i });
      }
      setInstiHASPreferences(instiHASPreferences);
      setInstiIARCandidates(instiIARCandidates);
      const totalInstiIARCandidates = instiIARCandidates.length;
      setInstiIARTotalCandidates(totalInstiIARCandidates);
      let instiIARPreferences = [];
      for (let i = 1; i <= totalInstiIARCandidates; i++) {
        instiIARPreferences.push({ value: i, label: i });
      }
      setInstiIARPreferences(instiIARPreferences);
      setInstiSSCandidates(instiSSCandidates);
      const totalInstiSSCandidates = instiSSCandidates.length;
      setInstiSSTotalCandidates(totalInstiSSCandidates);
      let instiSSPreferences = [];
      for (let i = 1; i <= totalInstiSSCandidates; i++) {
        instiSSPreferences.push({ value: i, label: i });
      }
      setInstiSSPreferences(instiSSPreferences);
      setInstiSGSCandidates(instiSGSCandidates);
      const totalInstiSGSCandidates = instiSGSCandidates.length;
      setInstiSGSTotalCandidates(totalInstiSGSCandidates);
      let instiSGSPreferences = [];
      for (let i = 1; i <= totalInstiSGSCandidates; i++) {
        instiSGSPreferences.push({ value: i, label: i });
      }
      setInstiSGSPreferences(instiSGSPreferences);
      setHostelSGSCandidates(hostelSGSCandidates);
      const totalHostelSGSCandidates = hostelSGSCandidates.length;
      setHostelSGSTotalCandidates(totalHostelSGSCandidates);
      let hostelSGSPreferences = [];
      for (let i = 1; i <= totalHostelSGSCandidates; i++) {
        hostelSGSPreferences.push({ value: i, label: i });
      }
      setHostelSGSPreferences(hostelSGSPreferences);
      setHostelHHSCandidates(hostelHHSCandidates);
      const totalHostelHHSCandidates = hostelHHSCandidates.length;
      setHostelHHSTotalCandidates(totalHostelHHSCandidates);
      let hostelHHSPreferences = [];
      for (let i = 1; i <= totalHostelHHSCandidates; i++) {
        hostelHHSPreferences.push({ value: i, label: i });
      }
      setHostelHHSPreferences(hostelHHSPreferences);
      setHostelSSCandidates(hostelSSCandidates);
      const totalHostelSSCandidates = hostelSSCandidates.length;
      setHostelSSTotalCandidates(totalHostelSSCandidates);
      let hostelSSPreferences = [];
      for (let i = 1; i <= totalHostelSSCandidates; i++) {
        hostelSSPreferences.push({ value: i, label: i });
      }
      setHostelSSPreferences(hostelSSPreferences);
      setHostelHLCandidates(hostelHLCandidates);
      const totalHostelHLCandidates = hostelHLCandidates.length;
      setHostelHLTotalCandidates(totalHostelHLCandidates);
      let hostelHLPreferences = [];
      for (let i = 1; i <= totalHostelHLCandidates; i++) {
        hostelHLPreferences.push({ value: i, label: i });
      }
      setHostelHLPreferences(hostelHLPreferences);
      setHostelSLCandidates(hostelSLCandidates);
      const totalHostelSLCandidates = hostelSLCandidates.length;
      setHostelSLTotalCandidates(totalHostelSLCandidates);
      let hostelSLPreferences = [];
      for (let i = 1; i <= totalHostelSLCandidates; i++) {
        hostelSLPreferences.push({ value: i, label: i });
      }
      setHostelSLPreferences(hostelSLPreferences);
      setHostelLLCandidates(hostelLLCandidates);
      const totalHostelLLCandidates = hostelLLCandidates.length;
      setHostelLLTotalCandidates(totalHostelLLCandidates);
      let hostelLLPreferences = [];
      for (let i = 1; i <= totalHostelLLCandidates; i++) {
        hostelLLPreferences.push({ value: i, label: i });
      }
      setHostelLLPreferences(hostelLLPreferences);
      setHostelTASCandidates(hostelTASCandidates);
      const totalHostelTASCandidates = hostelTASCandidates.length;
      setHostelTASTotalCandidates(totalHostelTASCandidates);
      let hostelTASPreferences = [];
      for (let i = 1; i <= totalHostelTASCandidates; i++) {
        hostelTASPreferences.push({ value: i, label: i });
      }
      setHostelTASPreferences(hostelTASPreferences);
      setDepartmentCandidates(departmentCandidates);
      const totalDepartmentCandidates = departmentCandidates.length;
      console.log("Totalccc", totalDepartmentCandidates)
      setDepartmentTotalCandidates(totalDepartmentCandidates);
      let departmentPreferences = [];
      for (let i = 1; i <= totalDepartmentCandidates; i++) {
        departmentPreferences.push({ value: i, label: i });
      }
      setDepartmentPreferences(departmentPreferences);
      console.log(departmentPreferences);
      setInstiAAS(null);
      setInstiRAS(null);
      setInstiCOCAS(null);
      setInstiCULSECA(null);
      setInstiCULSECL(null);
      setInstiHAS(null);
      setInstiIAR(null);
      setInstiSGS(null);
      setInstiSS(null);
      setHostelSGS(null);
      setHostelHHS(null);
      setHostelSS(null);
      setHostelSL(null);
      setHostelLL(null);
      setHostelHL(null);
      setHostelTAS(null);
      setDepartmentLegislator(null);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default loadCandidates;