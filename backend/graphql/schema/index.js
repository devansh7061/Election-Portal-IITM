const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Student {
        _id: ID!
        rollNo: String!
        password: String
        department: String!
        currentHostel: String!
        virtualHostel: String!
        course: String!
        hasVoted: String!
        program: String!
        residencyType: String!
    }
    type Candidate {
        _id: ID!
        rollNo: String!
        name: String!
        post: String!
        poll: String!
        picture: String!
        category: String!
    }

    type AuthData {
        studentId: ID!
        token: String!
        tokenExpiration: Int!
        virtualHostel: String!
        department: String!
        program: String!
        hasVoted: String!
        residencyType: String!
    }
    input CandidateInput {
        rollNo: String!
        name: String!
        post: String!
        poll: String!
        category: String!
        picture: String!
    }
    input StudentInput {
        rollNo: String!
        password: String!
        department: String!
        course: String!
        hasVoted: String!
        currentHostel: String!
        virtualHostel: String!
        program: String!
        residencyType: String!
    }
    type RootQuery {
        students: [Student!]!
        candidates(virtualHostel: String!, department: String!, program: String!): [Candidate!]!
        login(rollNo: String!, password: String!): AuthData!
    }
    type RootMutation {
        createStudent(studentInput: StudentInput): Student
        createCandidate(candidateInput: CandidateInput): Candidate
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);