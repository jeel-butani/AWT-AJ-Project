const UserModel = require("../User/user.model");

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