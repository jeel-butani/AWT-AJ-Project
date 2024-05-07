const express = require('express');
const router = express.Router();
const driverRequestController = require("./driver.request.controller");

router.post("/", driverRequestController.createDriverRequest);
router.get("/", driverRequestController.getAllDriverRequests);
router.get("/:id", driverRequestController.getDriverRequestById);
router.put("/:id", driverRequestController.updateDriverRequest);
router.delete("/:id", driverRequestController.deleteDriverRequest);
router.get("/user", driverRequestController.getDriverRequestsByUserId);
router.get("/request/:driverId", driverRequestController.getDriverRequestsByDriverId);
router.post("/accept", driverRequestController.acceptDriverRequest);
router.post("/reject", driverRequestController.rejectDriverRequest);
router.get("/accepted/:driverId", driverRequestController.getAcceptedDriverRequestsByDriverId);
router.get("/rejected/:driverId", driverRequestController.getRejectedDriverRequestsByDriverId);

module.exports = router;
