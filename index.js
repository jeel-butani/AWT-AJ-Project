const express = require('express');
const cors = require("cors");
const multer = require("multer");
const Path = require("path");
const { uploadStorage, fileFilter } = require("./src/userAadharUpload/user.adhar.upload");
const { driverUploadStorage, driverFileFilter } = require("./src/driverFileUpload/driver.adhar.upload");
const {driverLicenseStorage, driverLicenseFilter } = require("./src/driverFileUpload/driver.license.upload");
const {uploadCarStorage, fileCarFilter } = require("./src/carImageUpload/car.image.upload");
const {uploadBikeStorage, fileBikeFilter } = require("./src/bikeImageUpload/bike.image.upload");

const upload = multer({ storage: uploadStorage, fileFilter: fileFilter, fileSize: 2*1048576 });
const uploadDriver = multer({ storage: driverUploadStorage, fileFilter: driverFileFilter, fileSize: 2*1048576 });
const uploadLicense = multer({ storage: driverLicenseStorage, fileFilter: driverLicenseFilter, fileSize: 2*1048576 });
const uploadCar = multer({ storage: uploadCarStorage, fileFilter: fileCarFilter, fileSize: 1048576 });
const uploadBike = multer({ storage: uploadBikeStorage, fileFilter: fileBikeFilter, fileSize: 1048576 });



const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./src/config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection done with database");
  })
  .catch((err) => {
    console.log("error in db connection ", err);
    process.exit();
  });

const UserRouter = require("./src/User/user.routes");
app.use("/api/user", UserRouter);

const CompanyRouter = require("./src/Company/company.routes");
app.use("/api/company",CompanyRouter);

const DriverRouter = require("./src/Driver/driver.routes");
app.use("/api/driver", DriverRouter);

const BookingRouter = require("./src/Booking/booking.routes");
app.use("/api/booking", BookingRouter);

const PaymentRouter = require("./src/Payment/payment.routes");
app.use("/api/payment", PaymentRouter);

const DriverRequestRouter = require("./src/DriverRequest/driver.request.route");
app.use("/api/driverRequest", DriverRequestRouter);

app.post("/user/profile", upload.single("userAadhar ele"), async function (req, res, next) {
  try {
      res.status(200).json({ message: "Success", image: req.file.filename});
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/driver/profile", uploadDriver.single("driverAadhar ele"), async function (req, res, next) {
  try {
      res.status(200).json({ message: "Success", image: req.file.filename });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/driver/license", uploadLicense.single("driverLicense ele"), async function (req, res, next) {
  try {
      res.status(200).json({ message: "Success", image: req.file.filename });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/car/image", uploadCar.single("image"), async function (req, res, next) {
  try {
      res.status(200).json({ message: "Success" ,image: req.file.filename});
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/bike/image", uploadBike.single("image"), async function (req, res, next) {
  try {
      res.status(200).json({ message: "Success" ,image: req.file.filename});
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));