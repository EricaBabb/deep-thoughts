// import the gql tagged template function from apollo-server-express
//Tagged templates are an advanced use of template literals, and were introduced with ES6
const { gql } = require('apollo-server-express');

// create our typeDefs
//GraphQL has built-in data types known as scalars
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;
//! means data must exist for query to be carried out


// export the typeDefs
module.exports = typeDefs;