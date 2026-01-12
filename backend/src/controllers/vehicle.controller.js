import { Vehicle, User } from "../models/index.js";

export const registerVehicle = async (req, res) => {
  try {
    const { driver_id, make, model, plate_number, color, year } = req.body;

    const driver = await User.findByPk(driver_id);
    if (!driver || driver.role !== "driver") {
      return res
        .status(400)
        .json({ message: "Invalid driver ID or User is not a driver" });
    }

    const existingVehicle = await Vehicle.findOne({ where: { driver_id } });
    if (existingVehicle) {
      return res.status(400).json({ message: "Driver already has a vehicle" });
    }

    const vehicle = await Vehicle.create({
      driver_id,
      make,
      model,
      plate_number,
      color,
      year,
    });

    res.status(201).json({ message: "Vehicle registered", vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehicleByDriverId = async (req, res) => {
  try {
    const { driver_id } = req.params;
    const vehicle = await Vehicle.findOne({ where: { driver_id } });

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
