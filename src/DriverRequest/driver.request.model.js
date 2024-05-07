const mongoose = require("mongoose");

const driverRequestSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  isAccept: {
    type: String,
    default: "false"
  },
  isReject: {
    type: String,
    default: "false"
  }
},{
  timestamps: true
});

const DriverRequest = mongoose.model("DriverRequest", driverRequestSchema);

module.exports = DriverRequest;
