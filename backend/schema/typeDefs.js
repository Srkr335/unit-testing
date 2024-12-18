const { gql } = require('apollo-server');

const typeDefs = gql`
    type Task {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
    }

    type Query {
        tasks: [Task!]
    }

    type Mutation {
        addTask(title: String!, description: String!): Task!
        deleteTask(id: ID!): String!
        toggleTaskCompletion(id: ID!): Task!
        updateTask(id: ID!, title: String!, description: String!): Task!
    }
`;

module.exports = typeDefs;
