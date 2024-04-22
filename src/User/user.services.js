const UserModel = require("../User/user.model");
// require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
exports.createUser = async (userData) => {
  const user = new UserModel(userData);
  return await user.save();
};

exports.findAllUsers = async () => {
  return await UserModel.find();
};

exports.findUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

exports.findUserByName = async (name) => {
  const condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  return await UserModel.find(condition);
};

exports.updateUser = async (id, updateData) => {
  return await UserModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndRemove(id);
};

exports.getUserCount = async () => {
  try {
    const count = await UserModel.countDocuments();
    return count;
  } catch (err) {
    console.error("Error getting user count:", err);
    throw err;
  }
};

exports.checkUserExistsByEmailAndPassword = async (email, password) => {
  const user = await UserModel.findOne({ email, password });
  return user;
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