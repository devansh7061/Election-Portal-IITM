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
  departmentCandidates,
  setInstiAASCandidates,
  setInstiCULSECACandidates,
  setInstiCOCASCandidates,
  setHostelSGSCandidates,
  setDepartmentCandidates,
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
        if (candidate.category == course && candidate.poll == department) {
          departmentCandidates = [...departmentCandidates, candidate];
        }
      });
      setInstiAASCandidates(instiAASCandidates);
      setInstiCOCASCandidates(instiCOCASCandidates);
      setInstiCULSECACandidates(instiCULSECACandidates);
      setInstiCULSECLCandidates(instiCULSECLCandidates);
      setInstiHASCandidates(instiHASCandidates);
      setInstiIARCandidates(instiIARCandidates);
      setInstiSSCandidates(instiSSCandidates);
      setInstiSGSCandidates(instiSGSCandidates);
      setHostelSGSCandidates(hostelSGSCandidates);
      setDepartmentCandidates(departmentCandidates);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default loadCandidates;