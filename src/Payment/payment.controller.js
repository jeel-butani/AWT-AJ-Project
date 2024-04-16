const PaymentService = require("../Payment/payment.service");

exports.createPayment = async (req, res) => {
  const { userId, bookingId, paymentMode, amount } = req.body;

  if (!userId || !bookingId || !paymentMode || !amount) {
    return res.status(400).json({ message: "Required fields are empty" });
  }

  try {
    const newPayment = await PaymentService.createPayment(req.body);
    res
      .status(201)
      .json({ message: "Payment created successfully", payment: newPayment });
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentService.findAllPayments();
    res.send({ message: "Payments data", payments });
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPaymentById = async (req, res) => {
  const id = req.params.id;
  try {
    const payment = await PaymentService.findPaymentById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment found", payment });
  } catch (err) {
    console.error("Error fetching payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePayment = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const result = await PaymentService.updatePayment(id, updateData);
    if (!result) {
      return res
        .status(400)
        .json({ message: "No payment found with id: " + id });
    }
    res.json({ message: "Payment updated successfully" });
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deletePayment = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await PaymentService.deletePayment(id);
    if (!result) {
      return res
        .status(400)
        .json({ message: "No payment found with id: " + id });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error("Error deleting payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
