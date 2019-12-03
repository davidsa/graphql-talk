const {gql} = require('apollo-server');

// TODO: delete this

const typeDefs = gql`
  type Query {
    pets: [Pet!]!
  }

  type Pet {
    name: String
    age: Int
  }
`;

module.exports = typeDefs;
