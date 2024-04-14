const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  aadharCard: {
    type: String,
    required: true,
    unique: true
  },
  aadharCardImageUrl: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
