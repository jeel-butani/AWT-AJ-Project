// const express = require("express");
// const router = express.Router();
// const bookingController = require("../Booking/booking.controller");

// router.post("/", bookingController.createBooking);
// router.get("/", bookingController.getAllBookings);
// router.get("/:id", bookingController.getBookingById);
// router.put("/:id", bookingController.updateBooking);
// router.delete("/:id", bookingController.deleteBooking);
// router.get("/user", bookingController.getBookingByUserId);

// module.exports = router;


// booking.routes.js

const express = require('express');
const router = express.Router();
const bookingController = require("./booking.controller");

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
router.get("/user", bookingController.getBookingByUserId);

module.exports = router;
