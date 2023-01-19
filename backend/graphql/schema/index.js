const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Student {
        _id: ID!
        rollNo: String!
        password: String
        department: String!
        hostel: String!
        course: String!
        hasVoted: String!
    }
    type Candidate {
        _id: ID!
        rollNo: String!
        name: String!
        post: String!
        poll: String!
        picture: String!
        category: String!
        competition: Boolean!
    }

    type AuthData {
        studentId: ID!
        token: String!
        tokenExpiration: Int!
        hostel: String!
        department: String!
        course: String!
        hasVoted: String!
    }
    input CandidateInput {
        rollNo: String!
        name: String!
        post: String!
        poll: String!
        category: String!
        picture: String!
        competition: Boolean!
    }
    input StudentInput {
        rollNo: String!
        password: String!
        department: String!
        hostel: String!
        course: String!
        hasVoted: String!
    }
    type RootQuery {
        students: [Student!]!
        candidates(hostel: String!, department: String!, course: String!): [Candidate!]!
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