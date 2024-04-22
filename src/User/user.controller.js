const userService = require("../User/user.services");

exports.createUser = async (req, res) => {
  const { name, birthdate, email, phoneNumber, location, aadharCard, aadharCardImageUrl, password} = req.body;

  if (!name || !birthdate || !email || !phoneNumber || !location || !aadharCard || !aadharCardImageUrl || !password ) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.send({ message: "Users data", users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User found", user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByName = async (req, res) => {
  const name = req.query.name;
  try {
    const users = await userService.findUserByName(name);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found with name: " + name });
    }
    res.json({ message: "Users found", users });
  } catch (err) {
    console.error("Error fetching users by name:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await userService.updateUser(id, updateData);
    if (!result) {
      return res.status(400).json({ message: "No user found with id: " + id });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id);
    if (!result) {
      return res.status(400).json({ message: "No user found with id: " + id });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User found", user });
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const count = await userService.getUserCount();
    res.json({ count });
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkUserExistsByEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.checkUserExistsByEmailAndPassword(email, password);
    if(user){
      const token = await userService.createSecretToken(user._id);
      
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user, token: token });
    }
    else{
      return res.json("user not exist")
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

