const DriverRequestModel = require("./driver.request.model");
const BookingService = require("../Booking/booking.service");

exports.createDriverRequest = async (driverRequestData) => {
  const driverRequest = new DriverRequestModel(driverRequestData);
  return await driverRequest.save();
};

exports.findAllDriverRequests = async () => {
  return await DriverRequestModel.find();
};

exports.findDriverRequestById = async (id) => {
  return await DriverRequestModel.findById(id);
};

exports.updateDriverRequest = async (id, updateData) => {
  return await DriverRequestModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deleteDriverRequest = async (id) => {
  return await DriverRequestModel.findByIdAndDelete(id);
};

exports.findDriverRequestsByUserId = async (userId) => {
  return await DriverRequestModel.find({ userId });
};

exports.findDriverRequestsByDriverId = async (driverId) => {
  try {
    const driverRequests = await DriverRequestModel.find({ driverId });
    return driverRequests;
  } catch (err) {
    throw err;
  }
};

exports.acceptDriverRequest = async (driverId, driverRequestId) => {
  try {
    const driverRequest = await DriverRequestModel.findById(driverRequestId);
    if (!driverRequest) {
      throw new Error("Driver request not found");
    }

    const newBooking = await BookingService.createBooking({
      userId: driverRequest.userId,
      location: driverRequest.location,
      startDate: driverRequest.startDate,
      endDate: driverRequest.endDate,
      endTime: driverRequest.endTime,
      startTime: driverRequest.startTime,
      productId: driverId,
      type: "driver",
      paymentStatus: "0"
    });

    driverRequest.isAccept = true;
    await driverRequest.save();

    return newBooking;
  } catch (error) {
    throw error;
  }
};

exports.rejectDriverRequest = async (driverId, driverRequestId) => {
  try {
    const driverRequest = await DriverRequestModel.findById(driverRequestId);
    if (!driverRequest) {
      throw new Error("Driver request not found");
    }

    driverRequest.isReject = true;
    await driverRequest.save();

    return true;
  } catch (error) {
    throw error;
  }
};

exports.findAcceptedDriverRequestsByDriverId = async (driverId) => {
  try {
    const acceptedDriverRequests = await DriverRequestModel.find({ driverId, isAccept: true });
    return acceptedDriverRequests;
  } catch (error) {
    throw error;
  }
};

exports.findRejectedDriverRequestsByDriverId = async (driverId) => {
  try {
    const rejectedDriverRequests = await DriverRequestModel.find({ driverId, isReject: true });
    return rejectedDriverRequests;
  } catch (error) {
    throw error;
  }
};