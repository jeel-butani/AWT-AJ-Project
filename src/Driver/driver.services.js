const DriverModel = require("../Driver/driver.model");
const crypto = require('crypto');
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

exports.getUserCount = async () => {
  try {
    const count = await DriverModel.countDocuments();
    return count;
  } catch (err) {
    console.error("Error getting user count:", err);
    throw err;
  }
};

exports.checkDriverExistsByEmailAndPassword = async (aadharCardNumber, password) => {
  const driver = await DriverModel.findOne({ aadharCardNumber, password });
  return driver;
};

exports.createSecretToken = async (id) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString('hex');
        resolve(token);
      }
    });
  });
};