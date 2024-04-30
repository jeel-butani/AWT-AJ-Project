const driverService = require("../Driver/driver.services");

exports.createDriver = async (req, res) => {
  const { name, birthdate, licenseNumber, licensePhotoUrl, aadharCardNumber, aadharCardPhotoUrl, price, location, phoneNumber, typeOfVehicle, password } = req.body;

  if (!name || !birthdate || !licenseNumber || !licensePhotoUrl || !aadharCardNumber || !aadharCardPhotoUrl || !price || !location || !phoneNumber || !typeOfVehicle || !password) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newDriver = await driverService.createDriver(req.body);
    const token = await driverService.createSecretToken(newDriver._id);
      
      res.cookie("drivertoken", token, {
        withCredentials: true,
        httpOnly: false,
      });
    res.status(201).json({ message: "Driver created successfully", driver: newDriver, token: token });
  } catch (err) {
    console.error("Error creating driver:", err); 
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await driverService.findAllDrivers();
    res.send({ message: "Drivers data", drivers });
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDriverById = async (req, res) => {
  const id = req.params.id;
  try {
    const driver = await driverService.findDriverById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver found", driver });
  } catch (err) {
    console.error("Error fetching driver:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDriverByName = async (req, res) => {
  const name = req.query.name;
  try {
    const drivers = await driverService.findDriverByName(name);
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ message: "Drivers not found with name: " + name });
    }
    res.json({ message: "Drivers found", drivers });
  } catch (err) {
    console.error("Error fetching drivers by name:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateDriver = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await driverService.updateDriver(id, updateData);
    if (!result) {
      return res.status(400).json({ message: "No driver found with id: " + id });
    }
    res.json({ message: "Driver updated successfully" });
  } catch (err) {
    console.error("Error updating driver:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteDriver = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await driverService.deleteDriver(id);
    if (!result) {
      return res.status(400).json({ message: "No driver found with id: " + id });
    }
    res.json({ message: "Driver deleted successfully" });
  } catch (err) {
    console.error("Error deleting driver:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDriverCount = async (req, res) => {
  try {
    const count = await driverService.getUserCount();
    res.json({ count });
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkDriverExistsByEmailAndPassword = async (req, res) => {
  const { aadharCardNumber, password } = req.body;
  try {
    const driver = await driverService.checkDriverExistsByEmailAndPassword(aadharCardNumber, password);
    if(driver){
      const token = await driverService.createSecretToken(driver._id);
      
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "Driver signed in successfully", success: true, driver, token: token });
    }
    else{
      return res.json("driver not exist")
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};