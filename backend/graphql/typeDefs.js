import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Vehicle {
    vehicle_id: ID!
    driver_id: Int!
    make: String!
    model: String!
    plate_number: String!
    color: String
    year: Int
  }

  type Rating {
    rating_id: ID!
    ride_id: Int!
    given_by: Int!
    given_to: Int!
    score: Int!
    comment: String
  }

  input VehicleInput {
    driver_id: Int!
    make: String!
    model: String!
    plate_number: String!
    color: String
    year: Int
  }

  input VehicleUpdateInput {
    make: String
    model: String
    plate_number: String
    color: String
    year: Int
  }

  input RatingInput {
    ride_id: Int!
    given_by: Int!
    given_to: Int!
    score: Int!
    comment: String
  }

  type Query {
    getVehicleByDriver(driver_id: Int!): Vehicle
    getDriverRatings(driver_id: Int!): [Rating]
    getRatingsByRide(ride_id: Int!): [Rating]
    getRatingsByUser(user_id: Int!): [Rating]
  }

  type Mutation {
    registerVehicle(input: VehicleInput!): Vehicle
    addRating(input: RatingInput!): Rating

    updateVehicle(driver_id: Int!, input: VehicleUpdateInput!): Vehicle
    deleteVehicle(driver_id: Int!): String
  }
`;

export default typeDefs;
