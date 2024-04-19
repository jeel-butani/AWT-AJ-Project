const CompanyModel = require("../Company/company.model");
const mongoose = require('mongoose');
exports.createCompany = async (companyData) => {
  const company = new CompanyModel(companyData);
  return await company.save();
};

exports.findAllCompanies = async () => {
  return await CompanyModel.find();
};

exports.findCompanyById = async (id) => {
  return await CompanyModel.findById(id);
};

exports.findCompanyByEmail = async (email) => {
  return await CompanyModel.findOne({ email });
};

exports.findCompanyByName = async (name) => {
  const condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  return await CompanyModel.find(condition);
};

exports.updateCompany = async (id, updateData) => {
  return await CompanyModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteCompany = async (id) => {
  return await CompanyModel.findByIdAndDelete(id);
};

exports.upadteDriverToCompany = async (companyId, driverId) => {
  return await CompanyModel.findByIdAndUpdate(companyId, { $push: { drivers: driverId } }, { new: true });
};

exports.addDriverToCompany = async (companyId, driverId) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }

    company.drivers.push(driverId);

    const updatedCompany = await company.save();

    return updatedCompany;
  } catch (err) {
    throw err; 
  }
};

exports.findDriversByCompanyId = async (companyId) => {
  const company = await CompanyModel.findById(companyId).populate('drivers');
  if (!company) {
    throw new Error("Company not found");
  }
  return company.drivers;
};

exports.updateCarToCompany = async (companyId, carId) => {
  return await CompanyModel.findByIdAndUpdate(companyId, { $push: { cars: carId } }, { new: true });
};



exports.addCarToCompany = async (companyId, carId) => {
try {

  const company = await CompanyModel.findById(companyId);
  if (!company) {
    throw new Error("Company not found");
  }

  company.cars.push(carId);
  const updatedCompany = await company.save();

  return updatedCompany;
} catch (err) {
  throw err;
}
};
exports.addBikeToCompany = async (companyId, bikeId) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }

    company.bikes.push(bikeId);
    const updatedCompany = await company.save();

    return updatedCompany;
  } catch (err) {
    throw err;
  }
};

exports.updateBikeToCompany = async (companyId, bikeId) => {
  return await CompanyModel.findByIdAndUpdate(companyId, { $push: { bikes: bikeId } }, { new: true });
};

exports.addBikeToCompany = async (companyId, bikeId) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }

    company.bikes.push(bikeId);
    const updatedCompany = await company.save();

    return updatedCompany;
  } catch (err) {
    throw err;
  }
};
