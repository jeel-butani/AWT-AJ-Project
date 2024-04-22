const multer = require("multer");
const Path = require("path");
const { getDriverCount } = require('./driver.count.fetch');

const driverLicenseStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets/LicenseImage/");
    },
    filename: async function (req, file, cb) {
      try {
        const count = await getDriverCount();
        const filename = `driver${count + 1}${Path.extname(file.originalname)}`;
        cb(null, filename);
      } catch (error) {
        cb(error);
      }
    },
  });
  
  const driverLicenseFilter = (req, file, callback) => {
    const validExts = [".png", ".jpg", ".jpeg",".pdf"];
  
    if (!validExts.includes(Path.extname(file.originalname))) {
      return callback(new Error("Only .png, .jpg & .jpeg file format allowed"));
    }
  
    const fileSize = parseInt(req.headers["content-length"]);
  
    if (fileSize > 2*1048576) {
      return callback(new Error("File size is big"));
    }
  
    callback(null, true);
  };
  
  module.exports = { driverLicenseStorage, driverLicenseFilter };
  