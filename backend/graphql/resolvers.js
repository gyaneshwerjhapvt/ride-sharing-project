import { Vehicle, Rating, User } from "../models/index.js";

const resolvers = {
  // (parent, args, context, info)
  // Result from the parent resolver
  // In root resolvers (Query/Mutation level),
  // the parent parameter is always null or undefined because there's no parent field above the root.

  // learning

  // With all parameters visible:
  // async (parent, args, context, info) => {
  //   const { driver_id } = args;  // Extract from args
  //   // parent is null/undefined here (root resolver)
  //   // context could contain auth info, db connections
  //   // info contains GraphQL schema metadata
  //   return await Vehicle.findOne({ where: { driver_id } });
  // }

  Query: {
    getVehicleByDriver: async (_, { driver_id }) => {
      return await Vehicle.findOne({ where: { driver_id } });
    },
    getDriverRatings: async (_, { driver_id }) => {
      return await Rating.findAll({ where: { given_to: driver_id } });
    },
    getRatingsByRide: async (_, { ride_id }) => {
      return await Rating.findAll({ where: { ride_id } });
    },
    getRatingsByUser: async (_, { user_id }) => {
      return await Rating.findAll({ where: { given_to: user_id } });
    },
  },

  Mutation: {
    registerVehicle: async (_, { input }) => {
      const { driver_id } = input;

      const driver = await User.findByPk(driver_id);
      if (!driver || driver.role !== "driver") {
        throw new Error("Invalid driver ID or User is not a driver");
      }

      const existing = await Vehicle.findOne({ where: { driver_id } });
      if (existing) {
        throw new Error("Driver already has a vehicle");
      }

      return await Vehicle.create(input);
    },

    updateVehicle: async (_, { driver_id, input }) => {
      const vehicle = await Vehicle.findOne({ where: { driver_id } });

      if (!vehicle) {
        throw new Error("Vehicle not found for this driver");
      }

      return await vehicle.update(input);
    },

    deleteVehicle: async (_, { driver_id }) => {
      const vehicle = await Vehicle.findOne({ where: { driver_id } });

      if (!vehicle) {
        throw new Error("No vehicle found to delete");
      }

      await vehicle.destroy();
      return "Vehicle deleted successfully";
    },

    addRating: async (_, { input }) => {
      const { given_by, given_to } = input;
      const fromUser = await User.findByPk(given_by);
      const toUser = await User.findByPk(given_to);

      if (!fromUser) {
        throw new Error("Invalid 'given_by' user ID");
      }
      if (!toUser) {
        throw new Error("Invalid 'given_to' user ID");
      }

      return await Rating.create(input);
    },
  },
};

export default resolvers;
