const express = require("express");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const comprobarRol = require("../middleware/rol");

const {
  validatorGetItem,
  validatorCreateItem,
  validatorUpdateItem,
  validatorDeleteItem,
} = require("../validators/tracks");

const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");

router.get("/", authMiddleware, getItems);
router.get("/:id", validatorGetItem, getItem);
router.post(
  "/",
  validatorCreateItem,
  authMiddleware,
  comprobarRol(["user"]),
  customHeader,
  createItem
);
router.put("/:id", validatorUpdateItem, updateItem);
router.delete("/:id", validatorDeleteItem, deleteItem);

module.exports = router;
