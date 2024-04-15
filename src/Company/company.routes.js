const express = require("express");
const router = express.Router();
const companyController = require("../Company/company.controller");

router.post("/", companyController.createCompany);
router.get("/", companyController.getAllCompanies);
router.get("/name", companyController.getCompanyByName);
router.get("/email", companyController.getCompanyByEmail);
router.get("/:id", companyController.getCompanyById);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);
router.put("/:companyId/drivers/add", companyController.addDriverToCompany);
router.post("/:companyId/drivers", companyController.createDriverAndAddToCompany);

module.exports = router;
