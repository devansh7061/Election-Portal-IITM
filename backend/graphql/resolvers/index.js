const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Candidate = require("../../models/candidate");
const Student = require("../../models/student");
const Device = require("../../models/device");

const transformStudent = (student) => {
  return {
    ...student._doc,
    password: null,
    _id: student.id,
  };
};

const transformCandidate = (candidate) => {
  return {
    ...candidate._doc,
    _id: candidate.id,
  };
};

const transformDevice = (device) => {
    return {
        ...device._doc,
        _id: device.id,
    }
}
const student = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        return {
            ...student._doc,
            password: null,
            _id: student.id,
        };
    } catch (error) {
        throw error;
    }
}
module.exports = {
  students: async () => {
    try {
      const students = await Student.find();
      return students.map((student) => {
        return transformStudent(student);
      });
    } catch (error) {
      throw error;
    }
  },
  departmentStats: async ({ department }) => {
    try {
      const students = await Student.find();
      let votesCasted = 0;
      let totalVotes = 0;
      students.map((student) => {
        if (student.department == department) {
          totalVotes++;
          if (student.hasVoted == "true") {
            votesCasted++;
          }
        }
      });
      let turnout = (votesCasted * 100) / totalVotes;
      return { turnout: turnout };
    } catch (error) {
      throw error;
    }
  },
  hostelStats: async ({ hostel }) => {
    try {
      const students = await Student.find();
      let votesCasted = 0;
      let totalVotes = 0;
      students.map((student) => {
        if (student.currentHostel == hostel) {
          totalVotes++;
          if (student.hasVoted == "true") {
            votesCasted++;
          }
        }
      });
      let turnout = (votesCasted * 100) / totalVotes;
      return { turnout: turnout };
    } catch (error) {
      throw error;
    }
  },
  batchStats: async ({ course }) => {
    try {
      const students = await Student.find();
      let votesCasted = 0;
      let totalVotes = 0;
      students.map((student) => {
        if (student.course == course) {
          totalVotes++;
          if (student.hasVoted == "true") {
            votesCasted++;
          }
        }
      });
      let turnout = (votesCasted * 100) / totalVotes;
      return { turnout: turnout };
    } catch (error) {
      throw error;
    }
  },
  candidates: async ({ virtualHostel, department, program }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      let candidates = await Candidate.find();
      let hostelCandidates = [];
      let instituteCandidates = [];
      let departmentCandidates = [];
      let studentCategory;
      if (program == "MS" || program == "Ph.D") {
        studentCategory = "Research";
      } else {
        studentCategory = "Academic";
      }
      candidates.map((candidate) => {
        if (
          candidate.category.toUpperCase() == virtualHostel.toUpperCase() &&
          candidate.poll == "Hostel"
        ) {
          hostelCandidates = [...hostelCandidates, candidate];
        }
        if (
          candidate.poll == "Institute"
        ) {
          if(candidate.post == "Research Affairs Secretary" && studentCategory == "Research"){
            instituteCandidates = [...instituteCandidates, candidate];
          } else if (candidate.post == "Research Affairs Secretary" && studentCategory == "Academic") {
            instituteCandidates = [...instituteCandidates, candidate];
          } else {
            instituteCandidates = [...instituteCandidates, candidate];
          }
        }
        if (
          candidate.category.toUpperCase() == department.toUpperCase() &&
          candidate.poll == "Department"
        ) {
          if (
            studentCategory == "Research" &&
            candidate.post == "DEPARTMENT LEGISLATOR (RESEARCH)"
          ) {
            departmentCandidates = [...departmentCandidates, candidate];
          }
          if (
            studentCategory == "Academic" &&
            candidate.post == "DEPARTMENT LEGISLATOR (ACADEMIC)" &&
            program != "M.Tech"
          ) {
            departmentCandidates = [...departmentCandidates, candidate];
          }
        }
        if (
          candidate.category == "M.Tech" &&
          candidate.poll == "Department" &&
          program == "M.Tech"
        ) {
          departmentCandidates = [...departmentCandidates, candidate];
        }
      });
      candidates = [
        ...instituteCandidates,
        ...hostelCandidates,
        ...departmentCandidates,
      ];
      console.log(candidates);
      return candidates.map((candidate) => {
        return transformCandidate(candidate);
      });
    } catch (error) {
      throw error;
    }
  },
  createCandidate: async (args) => {
    try {
      const candidate = new Candidate({
        rollNo: args.candidateInput.rollNo,
        name: args.candidateInput.name,
        post: args.candidateInput.post,
        poll: args.candidateInput.poll,
        category: args.candidateInput.category,
        picture: args.candidateInput.picture,
      });
      const result = await candidate.save();

      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (error) {
      throw error;
    }
  },
  createStudent: async (args) => {
    try {
      const existingUser = await Student.findOne({
        rollNo: args.studentInput.rollNo,
      });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(args.studentInput.password, 12);

      const student = new Student({
        rollNo: args.studentInput.rollNo,
        password: hashedPassword,
        department: args.studentInput.department,
        virtualHostel: args.studentInput.virtualHostel,
        currentHostel: args.studentInput.currentHostel,
        course: args.studentInput.course,
        program: args.studentInput.program,
        hasVoted: false,
        residencyType: args.studentInput.residencyType,
      });

      const result = await student.save();

      return {
        ...result._doc,
        password: null,
        _id: result.id,
      };
    } catch (err) {
      throw err;
    }
  },
  studentVoted: async ({ rollNo }) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    try {
      Student.findOneAndUpdate({ rollNo: rollNo }, { hasVoted: "true" }, (error, data) => {
      if (error) {
        throw new Error("Invalid rollNo")
      } 
      })
      return {hasVoted: "true"}
    } catch (error) {
      throw error
    }
  },
  login: async ({ rollNo, password }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const student = await Student.findOne({ rollNo: rollNo });
    if (!student) {
      throw new Error("User does not exist");
    }
    const isEqual = await bcrypt.compare(password, student.password);
    if (!isEqual) {
      throw new Error("Password is incorrect");
    }
    if (student.hasVoted.toUpperCase() == "TRUE") {
      throw new Error("U have already voted");
    }
    const virtualHostel = student.virtualHostel;
    const program = student.program;
    const department = student.department;
    const hasVoted = student.hasVoted;
    const residencyType = student.residencyType;
    const token = jwt.sign(
      { studentId: student.id, rollNo: student.rollNo },
      "InstiElections",
      { expiresIn: "1h" }
    );
    return {
      studentId: student.id,
      token: token,
      tokenExpiration: 1,
      virtualHostel: virtualHostel,
      department: department,
      program: program,
      hasVoted: hasVoted,
      residencyType: residencyType,
    };
  },

  addDevice: async (args) => {
    try {
      const existingDevice = await Device.findOne({
        username: args.deviceInput.username,
      });
      if (existingDevice) {
        throw new Error("Device already exists");
      }
      const hashedPassword = await bcrypt.hash(args.deviceInput.password, 12);
      const device = new Device({
        username: args.deviceInput.username,
        password: hashedPassword,
      });

      const result = await device.save();

      return {
        ...result._doc,
        password: null,
        _id: result.id,
      };
    } catch (error) {
      throw err;
    }
  },
  deviceLogin: async ({ username, password }) => {
    const device = await Device.findOne({ username: username });
    if (!device) {
      throw new Error("Invalid username");
    }
    const isEqual = await bcrypt.compare(password, device.password);
    if (!isEqual) {
      throw new Error("Incorrect Password");
    }
    const token = jwt.sign(
      { deviceId: device.id, username: device.username },
      "InstiElections"
    );

    return { username: device.username, token: token };
  },
};