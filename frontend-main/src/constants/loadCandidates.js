function loadCandidates({
  hostel,
  department,
  course,
  token,
  instiAASCandidates,
  instiCOCASCandidates,
  instiCULSECACandidates,
  instiCULSECLCandidates,
  setInstiCULSECLCandidates,
  instiHASCandidates,
  setInstiHASCandidates,
  instiIARCandidates,
  setInstiIARCandidates,
  instiSSCandidates,
  setInstiSSCandidates,
  instiSGSCandidates,
  setInstiSGSCandidates,
  hostelSGSCandidates,
  setHostelSGSCandidates,
  setHostelSGSTotalCandidates,
  setHostelSGSPreferences,
  hostelHHSCandidates,
  setHostelHHSCandidates,
  setHostelHHSTotalCandidates,
  setHostelHHSPreferences,
  hostelHLCandidates,
  setHostelHLCandidates,
  setHostelHLTotalCandidates,
  setHostelHLPreferences,
  hostelLLCandidates,
  setHostelLLCandidates,
  setHostelLLTotalCandidates,
  setHostelLLPreferences,
  hostelSLCandidates,
  setHostelSLCandidates,
  setHostelSLTotalCandidates,
  setHostelSLPreferences,
  hostelTASCandidates,
  setHostelTASCandidates,
  setHostelTASTotalCandidates,
  setHostelTASPreferences,
  hostelSSCandidates,
  setHostelSSCandidates,
  setHostelSSTotalCandidates,
  setHostelSSPreferences,
  departmentCandidates,
  setInstiAASCandidates,
  setInstiCULSECACandidates,
  setInstiCOCASCandidates,
  setDepartmentCandidates,
  setInstiSGSPreferences,
  setInstiAASPreferences,
  setInstiCOCASPreferences,
  setInstiCULSECAPreferences,
  setInstiCULSECLPreferences,
  setInstiHASPreferences,
  setInstiSSPreferences,
  setInstiIARPreferences,
  setInstiAASTotalCandidates,
  setInstiCOCASTotalCandidates,
  setInstiCULSECATotalCandidates,
  setInstiCULSECLTotalCandidates,
  setInstiHASTotalCandidates,
  setInstiIARTotalCandidates,
  setInstiSSTotalCandidates,
  setInstiSGSTotalCandidates,
}) {
  const requestBody = {
    query: `
            query {
              candidates(hostel: "${hostel}", department: "${department}", course: "${course}") {
                name
                rollNo
                post
                poll
                picture
                category
                competition
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
          candidate.category == "Institute" &&
          candidate.post == "Academic Affairs Secretary"
        ) {
          instiAASCandidates = [...instiAASCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Co Curricular Affairs Secretary"
        ) {
          instiCOCASCandidates = [...instiCOCASCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Cultural Affairs Secretary (Arts)"
        ) {
          instiCULSECACandidates = [...instiCULSECACandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Cultural Affairs Secretary (Literary)"
        ) {
          instiCULSECLCandidates = [...instiCULSECLCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Hostel Affairs Secretary"
        ) {
          instiHASCandidates = [...instiHASCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "International and Alumni Relations Secretary"
        ) {
          instiIARCandidates = [...instiIARCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Sports Secretary (Institute)"
        ) {
          instiSSCandidates = [...instiSSCandidates, candidate];
        }
        if (
          candidate.category == "Institute" &&
          candidate.post == "Students General Secretary"
        ) {
          instiSGSCandidates = [...instiSGSCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "General Secretary (Hostel)"
        ) {
          hostelSGSCandidates = [...hostelSGSCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Health and Hygiene Secretary"
        ) {
          hostelHHSCandidates = [...hostelHHSCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Hostel Legislator"
        ) {
          hostelHLCandidates = [...hostelHLCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Literary Secretary"
        ) {
          hostelLLCandidates = [...hostelLLCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Social Secretary"
        ) {
          hostelSLCandidates = [...hostelSLCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Sports Secretary (Hostel)"
        ) {
          hostelSSCandidates = [...hostelSSCandidates, candidate];
        }
        if (
          candidate.category == hostel &&
          candidate.post == "Technical Affairs Secretary"
        ) {
          hostelTASCandidates = [...hostelTASCandidates, candidate];
        }
        if (candidate.category == course && candidate.poll == department) {
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
    })
    .catch((err) => {
      console.log(err);
    });
}

export default loadCandidates;