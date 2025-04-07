const express = require("express");

const { validatorMail } = require("../validators/mail");
const { send } = require("../controllers/email");
const authMiddleware = require("../middleware/session");

const router = express.Router();

router.post("/", authMiddleware, validatorMail, send);

module.exports = router;
