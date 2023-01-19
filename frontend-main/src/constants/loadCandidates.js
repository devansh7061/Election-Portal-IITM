function loadCandidates({
  hostel,
  department,
  course,
  token,
  instituteCandidates,
  hostelCandidates,
  departmentCandidates,
  setInstituteCandidates,
  setHostelCandidates
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
        if (candidate.category == "Institute") {
          instituteCandidates = [...instituteCandidates, candidate];
        }
        if (candidate.category == hostel) {
          hostelCandidates = [...hostelCandidates, candidate];
        }
        if (candidate.category == course && candidate.poll == department) {
          departmentCandidates = [...departmentCandidates, candidate];
        }
      });
      setInstituteCandidates(instituteCandidates);
      setHostelCandidates(hostelCandidates);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default loadCandidates;