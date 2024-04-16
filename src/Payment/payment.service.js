const PaymentModel = require("../Payment/payment.model");

exports.createPayment = async (paymentData) => {
  const payment = new PaymentModel(paymentData);
  return await payment.save();
};

exports.findAllPayments = async () => {
  return await PaymentModel.find();
};

exports.findPaymentById = async (id) => {
  return await PaymentModel.findById(id);
};

exports.updatePayment = async (id, updateData) => {
  return await PaymentModel.findByIdAndUpdate(id, updateData, {
    useFindAndModify: false,
  });
};

exports.deletePayment = async (id) => {
  return await PaymentModel.findByIdAndDelete(id);
};
