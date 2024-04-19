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
router.get("/:companyId/drivers", companyController.getDriversByCompanyId);
router.put("/:companyId/cars/add", companyController.addCarToCompany);
router.post("/:companyId/cars", companyController.createCarAndAddToCompany);
router.get("/:companyId/cars", companyController.getCarsByCompanyId);
router.put("/:companyId/bikes/add", companyController.addbikeToCompany);
router.post("/:companyId/bikes", companyController.createBikeAndAddToCompany);
router.get("/:companyId/bikes", companyController.getBikesByCompanyId);

module.exports = router;
