const driverRequestService = require("./driver.request.service");

exports.createDriverRequest = async (req, res) => {
    const {
        driverId,
        userId,
        startDate,
        startTime,
        endDate,
        endTime,
        location,
        isAccept,
        isReject
    } = req.body;

    if (
        !driverId ||
        !userId ||
        !startDate ||
        !startTime ||
        !endDate ||
        !endTime ||
        !location ||
        !isAccept ||
        !isReject
    ) {
        return res.status(400).json({ message: "Fields are empty" });
    }

    try {
        const newDriverRequest = await driverRequestService.createDriverRequest(req.body);
        res.status(201).json({
            message: "Driver request created successfully",
            driverRequest: newDriverRequest,
        });
    } catch (err) {
        console.error("Error creating driver request:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllDriverRequests = async (req, res) => {
    try {
        const driverRequests = await driverRequestService.findAllDriverRequests();
        res.send({ message: "Driver requests data", driverRequests });
    } catch (err) {
        console.error("Error fetching driver requests:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDriverRequestById = async (req, res) => {
    const id = req.params.id;
    try {
        const driverRequest = await driverRequestService.findDriverRequestById(id);
        if (!driverRequest) {
            return res.status(404).json({ message: "Driver request not found" });
        }
        res.json({ message: "Driver request found", driverRequest });
    } catch (err) {
        console.error("Error fetching driver request:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateDriverRequest = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const result = await driverRequestService.updateDriverRequest(id, updateData);
        if (!result) {
            return res
                .status(400)
                .json({ message: "No driver request found with id: " + id });
        }
        res.json({ message: "Driver request updated successfully" });
    } catch (err) {
        console.error("Error updating driver request:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteDriverRequest = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await driverRequestService.deleteDriverRequest(id);
        if (!result) {
            return res
                .status(400)
                .json({ message: "No driver request found with id: " + id });
        }
        res.json({ message: "Driver request deleted successfully" });
    } catch (err) {
        console.error("Error deleting driver request:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDriverRequestsByUserId = async (req, res) => {
    const userId = req.query.userId;
    try {
        const driverRequests = await driverRequestService.findDriverRequestsByUserId(userId);
        if (!driverRequests || driverRequests.length === 0) {
            return res
                .status(404)
                .json({ message: "Driver requests not found for user with id: " + userId });
        }
        res.json({ message: "Driver requests found", driverRequests });
    } catch (err) {
        console.error("Error fetching driver requests by userId:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getDriverRequestsByDriverId = async (req, res) => {
    const driverId = req.params.driverId;
    try {
        const driverRequests = await driverRequestService.findDriverRequestsByDriverId(driverId);
        if (!driverRequests || driverRequests.length === 0) {
            return res.status(404).json({ message: "Driver requests not found for driver with id: " + driverId });
        }
        res.json({ message: "Driver requests found", driverRequests });
    } catch (err) {
        console.error("Error fetching driver requests by driverId:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.acceptDriverRequest = async (req, res) => {
    const { driverId, driverRequestId } = req.body;

    try {
        const newBooking = await driverRequestService.acceptDriverRequest(driverId, driverRequestId);
        res.status(201).json({
            message: "Booking created successfully from driver request",
            booking: newBooking
        });
    } catch (error) {
        console.error("Error accepting driver request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.rejectDriverRequest = async (req, res) => {
    const { driverId, driverRequestId } = req.body;

    try {
        const newBooking = await driverRequestService.rejectDriverRequest(driverId, driverRequestId);
        res.status(201).json({
            message: "Booking rejected successfully from driver request",
            rejected: true
        });
    } catch (error) {
        console.error("Error accepting driver request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAcceptedDriverRequestsByDriverId = async (req, res) => {
    const driverId = req.params.driverId;
    try {
        const acceptedDriverRequests = await driverRequestService.findAcceptedDriverRequestsByDriverId(driverId);
        res.status(200).json({ message: "Accepted driver requests found", driverRequests: acceptedDriverRequests });
    } catch (error) {
        console.error("Error fetching accepted driver requests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getRejectedDriverRequestsByDriverId = async (req, res) => {
    const driverId = req.params.driverId;
    try {
        const rejectedDriverRequests = await driverRequestService.findRejectedDriverRequestsByDriverId(driverId);
        res.status(200).json({ message: "Rejected driver requests found", driverRequests: rejectedDriverRequests });
    } catch (error) {
        console.error("Error fetching rejected driver requests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};