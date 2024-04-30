const multer = require("multer");
const Path = require("path");
const { getBikeCount } = require('./bike.count.fetch');

const uploadBikeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/bikesImage/");
  },
  filename: async function (req, file, cb) {
    try {
      const count = await getBikeCount();
      const filename = `Bike_${count + 1}${Path.extname(file.originalname)}`;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

const fileBikeFilter = (req, file, callback) => {
  const validExts = [".png", ".jpg", ".jpeg"];

  if (!validExts.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg & .jpeg file format allowed"));
  }

  const fileSize = parseInt(req.headers["content-length"]);

  if (fileSize > 1048576) {
    return callback(new Error("File size is big"));
  }

  callback(null, true);
};

module.exports = { uploadBikeStorage, fileBikeFilter };
