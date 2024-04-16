const express = require('express');
const cors = require("cors");
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

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));