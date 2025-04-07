const express = require("express");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const comprobarRol = require("../middleware/rol");
const putUserMiddleware = require("../middleware/putUser");

// Importa los validadores
const {
  validatorGetItem,
  validatorCreateItem,
  validatorUpdateItem,
  validatorDeleteItem,
} = require("../validators/users");

const router = express.Router();

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/users");

// Obtener todos los usuarios (no requiere validación de body ni params)
router.get("/", authMiddleware, getItems);

// Obtener un usuario por ID
router.get("/:id", validatorGetItem, getItem);

// Crear un nuevo usuario
router.post("/", validatorCreateItem, customHeader, createItem);

// Actualizar un usuario
router.put(
  "/:id",
  validatorUpdateItem,
  authMiddleware,
  putUserMiddleware,
  updateItem
);

// Eliminar un usuario
router.delete("/:id", validatorDeleteItem, deleteItem);

module.exports = router;
