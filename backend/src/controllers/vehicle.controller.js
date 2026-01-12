const Vehicle = require("../models/Vehicle.js");
const User = require("../models/User.js");


exports.registerVehicle = async (req, res) => {
  try {
    const { driver_id, make, model, plate_number, color, year } = req.body;

    
    // const driver = await User.findByPk(driver_id);
    // if (!driver || driver.role !== "driver") {
    //   return res.status(400).json({
    //     message: "Invalid driver"
    //   });
    // }

    const existingVehicle = await Vehicle.findOne({
      where: { driver_id }
    });

    if (existingVehicle) {
      return res.status(400).json({
        message: "Driver already has a vehicle"
      });
    }

    const vehicle = await Vehicle.create({
      driver_id,
      make,
      model,
      plate_number,
      color,
      year
    });

    res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getVehicleByDriverId = async (req, res) => {
  try {

    const id = req.params.driver_id;
    const vehicle = await Vehicle.findOne({driver_id: id});

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};