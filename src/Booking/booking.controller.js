const bookingService = require("./booking.service");

exports.createBooking = async (req, res) => {
  const {
    userId,
    location,
    startDate,
    endDate,
    productId,
    driverId,
    paymentStatus,
  } = req.body;

  if (
    !userId ||
    !location ||
    !startDate ||
    !endDate ||
    !productId ||
    !driverId ||
    !paymentStatus
  ) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.findAllBookings();
    res.send({ message: "Bookings data", bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookingById = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await bookingService.findBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking found", booking });
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBooking = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await bookingService.updateBooking(id, updateData);
    if (!result) {
      return res
        .status(400)
        .json({ message: "No booking found with id: " + id });
    }
    res.json({ message: "Booking updated successfully" });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await bookingService.deleteBooking(id);
    if (!result) {
      return res
        .status(400)
        .json({ message: "No booking found with id: " + id });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookingByUserId = async (req, res) => {
  const userId = req.query.userId;
  try {
    const bookings = await bookingService.findBookingsByUserId(userId);
    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "Bookings not found for user with id: " + userId });
    }
    res.json({ message: "Bookings found", bookings });
  } catch (err) {
    console.error("Error fetching bookings by userId:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
