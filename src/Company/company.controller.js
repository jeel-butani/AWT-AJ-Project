const companyService = require("../Company/company.services");
const driverService = require("../Driver/driver.services");
const axios = require('axios');
exports.createCompany = async (req, res) => {
  const { name, gstNumber, email, ownerName, location, password } = req.body;

  if (!name || !gstNumber || !email || !ownerName || !location || !password) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newCompany = await companyService.createCompany(req.body);
    res.status(201).json({ message: "Company created successfully", company: newCompany });
  } catch (err) {
    console.error("Error creating company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.findAllCompanies();
    res.send({ message: "Companies data", companies });
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyById = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await companyService.findCompanyById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company found", company });
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyByName = async (req, res) => {
  const name = req.query.name;
  try {
    const companies = await companyService.findCompanyByName(name);
    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "Companies not found with name: " + name });
    }
    res.json({ message: "Companies found", companies });
  } catch (err) {
    console.error("Error fetching companies by name:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCompany = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await companyService.updateCompany(id, updateData);
    if (!result) {
      return res.status(400).json({ message: "No company found with id: " + id });
    }
    res.json({ message: "Company updated successfully" });
  } catch (err) {
    console.error("Error updating company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await companyService.deleteCompany(id);
    if (!result) {
      return res.status(400).json({ message: "No company found with id: " + id });
    }
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error("Error deleting company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCompanyByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const company = await companyService.findCompanyByEmail(email);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json({ message: "Company found", company });
  } catch (err) {
    console.error("Error fetching company by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addDriverToCompany = async (req, res) => {
  const companyId = req.params.companyId; 
  const { driverId } = req.body; 
  try {
    const updatedCompany = await companyService.upadteDriverToCompany(companyId, driverId);
    res.status(200).json({ message: "Driver added to company", company: updatedCompany });
  } catch (err) {
    console.error("Error adding driver to company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createDriverAndAddToCompany = async (req, res) => {
  const { name, birthdate, licenseNumber, licensePhotoUrl, aadharCardNumber, aadharCardPhotoUrl, price, location, phoneNumber, typeOfVehicle, password } = req.body;

  if (!name || !birthdate || !licenseNumber || !licensePhotoUrl || !aadharCardNumber || !aadharCardPhotoUrl || !price || !location || !phoneNumber || !typeOfVehicle || !password) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newDriver = await driverService.createDriver(req.body);

    const companyId = req.params.companyId;
    await companyService.addDriverToCompany(companyId, newDriver._id);
 
    res.status(201).json({ message: "Driver created and added to company successfully", driver: newDriver });
  } catch (err) {
    console.error("Error creating driver and adding to company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDriversByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const drivers = await companyService.findDriversByCompanyId(companyId);
    res.json({ message: "Drivers found", drivers });
  } catch (err) {
    console.error("Error fetching drivers for company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addCarToCompany = async (req, res) => {
  const companyId = req.params.companyId; 
  const { carId } = req.body; 
  try {
    const updatedCompany = await companyService.updateCarToCompany(companyId, carId);
    res.status(200).json({ message: "Car added to company", company: updatedCompany });
  } catch (err) {
    console.error("Error adding car to company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createCarAndAddToCompany = async (req, res) => {
  const { carName, fuelType, transmissionType, seats, registrationNumber, companyName, amount, imageUrl, totalCount, availableCount } = req.body;

  if (!carName || !fuelType || !transmissionType || !seats || !registrationNumber || !companyName || !amount || !imageUrl || !totalCount || !availableCount) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newCarResponse = await axios.post('http://localhost:8080/api/cars/', req.body);
    const newCarId = newCarResponse.data.id;

    const companyId = req.params.companyId;
    await companyService.addCarToCompany(companyId, newCarId);

    res.status(201).json({ message: "Car created and added to company successfully", car: newCarResponse.data });
  } catch (err) {
    console.error("Error creating car and adding to company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCarsByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const carsResponse = await axios.get("http://localhost:8080/api/cars/");
    const allCars = carsResponse.data;

    const cars = allCars.filter(car => car.companyId === companyId);

    res.json({ message: "Cars found", cars });
  } catch (err) {
    console.error("Error fetching cars for company:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};