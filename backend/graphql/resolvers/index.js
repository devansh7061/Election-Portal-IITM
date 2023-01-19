const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Candidate = require("../../models/candidate");
const Student = require("../../models/student");

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
            })
        } catch (error) {
            throw error;
        }
    },
    candidates: async ({hostel, department, course}, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            let candidates = await Candidate.find();
            let hostelCandidates = [];
            let instituteCandidates = [];
            let departmentCandidates = [];
            candidates.map((candidate) => {
                if (candidate.category == hostel) {
                    hostelCandidates = [...hostelCandidates, candidate];
                }
                if (candidate.category == "Institute") {
                    instituteCandidates = [...instituteCandidates, candidate];
                }
                if (candidate.category == course && candidate.poll == department) {
                    departmentCandidates = [...departmentCandidates, candidate];
                }
            })
            candidates = [...instituteCandidates, ...hostelCandidates, ...departmentCandidates];
            console.log(candidates);
            return candidates.map((candidate) => {
                return transformCandidate(candidate);
            })
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
                competition: args.candidateInput.competition
            })
            const result = await candidate.save();

            return {
                ...result._doc,
                _id: result.id
            }
        } catch (error) {
            throw error;
        }
    },
    createStudent: async (args) => {
        try {
            const existingUser = await Student.findOne({ rollNo: args.studentInput.rollNo });
            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(args.studentInput.password, 12);

            const student = new Student({
                rollNo: args.studentInput.rollNo,
                password: hashedPassword,
                department: args.studentInput.department,
                hostel: args.studentInput.hostel,
                course: args.studentInput.course,
                hasVoted: false
            });

            const result = await student.save();

            return {
                ...result._doc,
                password: null,
                _id: result.id
            };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ rollNo, password }) => {
        const student = await Student.findOne({ rollNo: rollNo });
        if (!student) {
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, student.password);
        if (!isEqual) {
            throw new Error("Password is incorrect");
        }
        const hostel = student.hostel;
        const course = student.course;
        const department = student.department;
        const hasVoted = student.hasVoted;
        const token = jwt.sign(
          { studentId: student.id, rollNo: student.rollNo },
          "InstiElections",
          { expiresIn: "1h" }
        );
        return { studentId: student.id, token: token, tokenExpiration: 1, hostel: hostel, department: department, course: course, hasVoted: hasVoted };
    }
}