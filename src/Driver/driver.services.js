const DriverModel = require("../Driver/driver.model");

exports.createDriver = async (driverData) => {
  const driver = new DriverModel(driverData);
  return await driver.save();
};

exports.findAllDrivers = async () => {
  return await DriverModel.find();
};

exports.findDriverById = async (id) => {
  return await DriverModel.findById(id);
};

exports.findDriverByEmail = async (email) => {
  return await DriverModel.findOne({ email });
};

exports.findDriverByName = async (name) => {
  const condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  return await DriverModel.find(condition);
};

exports.updateDriver = async (id, updateData) => {
  return await DriverModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteDriver = async (id) => {
  return await DriverModel.findByIdAndDelete(id);
};
