const PetModel = require('./models');
const {deleteFile, uploadFromSteam} = require('./s3');

const resolvers = {
  Query: {
    pets: () => PetModel.find(),
  },
  Mutation: {
    addPet: async (_, {petInput}) => {
      const {photo, ...other} = petInput;
      const pet = await PetModel.create(other);
      const {createReadStream} = await photo;
      const readable = createReadStream();
      const {Location} = await uploadFromSteam(readable, pet._id.toString());
      return {
        ...pet.toObject(),
        photo: Location,
      };
    },
    deletePet: async (_, {petId}) => {
      const pet = await PetModel.findOneAndDelete({_id: petId});
      await deleteFile(petId);
      return pet;
    },
  },
  Pet: {
    photo: pet =>
      `https://uruit-pet-photos.s3-us-west-2.amazonaws.com/${pet._id}`,
  },
};

module.exports = resolvers;
