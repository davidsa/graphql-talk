const uuid = require('uuid/v4');
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    users: [User!]!
    cities: [City!]!
  }

  type Mutation {
    addUser(userInput: UserInput): User
    addCity(cityInput: CityInput): City
  }

  type User {
    id: ID
    name: String!
    age: Int
    isEmployed: Boolean!
    location: City!
  }

  input UserInput {
    name: String!
    age: Int
    isEmployed: Boolean!
    cityId: ID!
  }

  type City {
    id: ID
    name: String!
    country: String!
  }

  input CityInput {
    id: ID
    name: String!
    country: String!
  }
`;

const Users = [];
const Cities = [];
const AWS = {};

const resolvers = {
  Query: {
    users: () => {
      return Users;
    },
    cities: () => Cities,
    user: (_, {id}) => {
      return Users.find(user => user.id === id);
    },
  },
  Mutation: {
    addUser: (_, params) => {
      const {
        userInput: {cityId, ...otherFields},
      } = params;
      const city = Cities.find(city => city.id === cityId);
      if (!city) return;
      const user = {
        id: uuid(),
        ...otherFields,
      };
      Users.push(user);
      return user;
    },
    addCity: (_, params) => {
      const city = {
        id: uuid(),
        ...params.cityInput,
      };
      Cities.push(city);
      return city;
    },
  },
  City: (root, params) => {
    console.log(root);
    return {name: 'Boyaca', country: 'Colombia'};
  },
};

const PORT = 3001;
const server = new ApolloServer({typeDefs, resolvers});
server
  .listen({port: PORT})
  .then(({url}) => console.log(`> Server listening on port ${url}`));
