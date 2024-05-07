const express = require('express');
const router = express.Router();
const bookingController = require("./booking.controller");

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
router.get("/user", bookingController.getBookingByUserId);
router.get("/user/:userId", bookingController.getBookingsByUserId);

module.exports = router;
