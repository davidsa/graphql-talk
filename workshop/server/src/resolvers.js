const PetModel = require('./models');

const resolvers = {
  Query: {
    pets: () => PetModel.find(),
  },
  Mutation: {
    addPet: (_, {petInput}) => PetModel.create(petInput),
    deletePet: (_, {petId}) => PetModel.findOneAndDelete({_id: petId}),
  },
};

module.exports = resolvers;
