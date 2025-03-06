const express = require("express");
const router = express.Router();
const {
  uploadMiddleware,
  uploadMiddlewareMemory,
} = require("./../utils/handleStorage");
const { postImage, uploadImage } = require("./../controllers/storage");

router.post("/local", uploadMiddlewareMemory.single("image"), postImage);
router.post("/", uploadMiddlewareMemory.single("image"), uploadImage);

router.use((err, req, res, next) => {
  res.status(413).send("Archivo muy grande");
});

module.exports = router;
