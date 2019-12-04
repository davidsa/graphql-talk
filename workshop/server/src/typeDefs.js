const {gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
    pets: [Pet!]!
  }

  type Mutation {
    addPet(petInput: PetInput!): Pet
    deletePet(petId: ID): Pet
  }

  type Pet {
    _id: ID
    name: String!
    age: Int!
    race: String!
    photo: String!
  }

  input PetInput {
    name: String!
    age: Int!
    race: String!
    photo: Upload!
  }
`;

module.exports = typeDefs;
