const express = require("express");
const router = express.Router();
const driverController = require("../Driver/driver.controller");

router.get("/countDrivers", driverController.getDriverCount);
router.post("/", driverController.createDriver);
router.get("/", driverController.getAllDrivers);
router.get("/name", driverController.getDriverByName);
router.get("/:id", driverController.getDriverById);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
