const BookingModel = require("../Booking/booking.model");

exports.createBooking = async (bookingData) => {
  const booking = new BookingModel(bookingData);
  return await booking.save();
};

exports.findAllBookings = async () => {
  return await BookingModel.find();
};

exports.findBookingById = async (id) => {
  return await BookingModel.findById(id);
};

exports.updateBooking = async (id, updateData) => {
  return await BookingModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteBooking = async (id) => {
  return await BookingModel.findByIdAndDelete(id);
};

exports.findBookingsByUserId = async (userId) => {
  return await BookingModel.find({ userId });
};
