const CompanyModel = require("../Company/company.model");

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
  return await CompanyModel.findByIdAndRemove(id);
};



















