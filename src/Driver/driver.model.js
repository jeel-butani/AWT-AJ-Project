const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  licensePhotoUrl: {
    type: String,
    required: true
  },
  aadharCardNumber: {
    type: String,
    required: true,
    unique: true
  },
  aadharCardPhotoUrl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  typeOfVehicle: {
    type: String,
    enum: ["2-wheel", "4-wheel"],
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
