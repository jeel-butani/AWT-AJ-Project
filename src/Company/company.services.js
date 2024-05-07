const CompanyModel = require("../Company/company.model");
const DriverModel = require("../Driver/driver.model");
const crypto = require('crypto');
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

exports.checkCompanyExistsByEmailAndPassword = async (email, password) => {
  const company = await CompanyModel.findOne({ email, password });
  return company;
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

exports.getCompaniesByLocation = async (location) => {
  try {
    const companies = await CompanyModel.find({ location: { $regex: new RegExp(location, "i") } });
    return companies;
  } catch (error) {
    throw error;
  }
};

exports.getBikesByCompanyId = async (companyId) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    return company.bikes;
  } catch (err) {
    throw err;
  }
};

exports.getCarsByCompanyId = async (companyId) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    return company.cars;
  } catch (err) {
    throw err;
  }
};

exports.getDriversByLocation = async (location) => {
  try {
    const drivers = await DriverModel.find({ location: { $regex: new RegExp(location, "i") } });
    return drivers;
  } catch (error) {
    throw error;
  }
};