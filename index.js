const express = require('express');
const cors = require("cors");
const multer = require("multer");
const Path = require("path");
const { getUserCount } = require('./src/userAadharUpload/user.cout.fetch');
const { getDriverCount } = require('./src/driverFileUpload/driver.count.fetch');
const { uploadStorage, fileFilter } = require("./src/userAadharUpload/user.adhar.upload");
const { driverUploadStorage, driverFileFilter } = require("./src/driverFileUpload/driver.adhar.upload");
const {driverLicenseStorage, driverLicenseFilter } = require("./src/driverFileUpload/driver.license.upload");

const upload = multer({ storage: uploadStorage, fileFilter: fileFilter, fileSize: 2*1048576 });
const uploadDriver = multer({ storage: driverUploadStorage, fileFilter: driverFileFilter, fileSize: 2*1048576 });
const uploadLicense = multer({ storage: driverLicenseStorage, fileFilter: driverLicenseFilter, fileSize: 2*1048576 });
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

app.post("/user/profile", upload.single("userAadhar ele"), async function (req, res, next) {
  try {
      const count = await getUserCount();
      res.status(200).json({ message: "Success", count: count});
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/driver/profile", uploadDriver.single("driverAadhar ele"), async function (req, res, next) {
  try {
      const count = await getDriverCount();
  
      res.status(200).json({ message: "Success", count: count });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.post("/driver/license", uploadLicense.single("driverLicense ele"), async function (req, res, next) {
  try {
      const count = await getDriverCount();
      const filename = `driver${count + 1}${Path.extname(req.file.originalname)}`;
      res.status(200).json({ message: "Success", filename: filename });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to upload file" });
  }
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));