const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  ownerName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ownerContact:{
    type: String,
    require: true
  },
  drivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver' 
  }],
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cars'
  }],
  bikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bikes'
  }]
}, {
  timestamps: true
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
