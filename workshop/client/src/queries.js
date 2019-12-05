import gql from 'graphql-tag'

export const ADD_PET = gql`
  mutation AddPet($petInput: PetInput!) {
    addPet(petInput: $petInput) {
      _id
      name
      age
      race
      photo
    }
  }
`
export const GET_PETS = gql`
  query GetPets {
    pets {
      _id
      name
      age
      race
      photo
    }
  }
`

export const DELETE_PET = gql`
  mutation DeletePet($id: ID) {
    deletePet(petId: $id) {
      _id
      name
    }
  }
`
