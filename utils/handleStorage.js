const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const pathStorage = __dirname + "/../storage";
    callback(null, pathStorage);
  },
  filename: function (req, file, callback) {
    const ext = file.originalname.split(".").pop();
    const filename =
      file.originalname.split(".")[0] + "-" + Date.now() + "." + ext;
    callback(null, filename);
  },
});

const memory = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 1 },
});
const uploadMiddlewareMemory = multer({
  storage: memory,
  limits: { fileSize: 1 },
});

module.exports = { uploadMiddleware, uploadMiddlewareMemory };
