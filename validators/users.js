const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");

// Valida que el parámetro "id" sea un MongoID válido
const validatorGetItem = [
  check("id")
    .exists()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("El id debe ser un MongoID válido"),
  validatorResults,
];

// Valida la creación de un usuario
const validatorCreateItem = [
  check("name")
    .exists()
    .withMessage("El nombre es requerido")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
  check("age")
    .exists()
    .withMessage("La edad es requerida")
    .isNumeric()
    .withMessage("La edad debe ser un número"),
  check("email")
    .exists()
    .withMessage("El correo electrónico es requerido")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido"),
  check("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  validatorResults,
];

// Valida la actualización de un usuario. Se valida el "id" y se hacen opcionales las demás propiedades.
const validatorUpdateItem = [
  check("id")
    .exists()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("El id debe ser un MongoID válido"),
  check("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
  check("age").optional().isNumeric().withMessage("La edad debe ser un número"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido"),
  check("password")
    .optional()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía"),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  validatorResults,
];

// Valida que el "id" proporcionado para eliminar sea un MongoID válido
const validatorDeleteItem = [
  check("id")
    .exists()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("El id debe ser un MongoID válido"),
  validatorResults,
];

module.exports = {
  validatorGetItem,
  validatorCreateItem,
  validatorUpdateItem,
  validatorDeleteItem,
};
