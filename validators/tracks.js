const { check } = require("express-validator");
const validatorResults = require("../utils/handleValidator");

// Valida el parámetro "id" para obtener un item
const validatorGetItem = [
  check("id")
    .exists()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("El id debe ser un MongoID válido"),
  validatorResults,
];

// Valida la creación de un track
const validatorCreateItem = [
  check("artist.name")
    .exists()
    .withMessage("El nombre del artista es requerido")
    .notEmpty()
    .withMessage("El nombre del artista no puede estar vacío"),
  check("artist.nickname")
    .exists()
    .withMessage("El apodo del artista es requerido")
    .notEmpty()
    .withMessage("El apodo del artista no puede estar vacío"),
  check("artist.edad")
    .exists()
    .withMessage("La edad del artista es requerida")
    .isNumeric()
    .withMessage("La edad debe ser un número"),
  check("album")
    .exists()
    .withMessage("El nombre del álbum es requerido")
    .notEmpty()
    .withMessage("El nombre del álbum no puede estar vacío"),
  check("cover")
    .exists()
    .withMessage("El cover es requerido")
    .notEmpty()
    .withMessage("El cover no puede estar vacío"),
  validatorResults,
];

// Valida la actualización de un track
const validatorUpdateItem = [
  check("id")
    .exists()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("El id debe ser un MongoID válido"),
  check("artist.name")
    .optional()
    .notEmpty()
    .withMessage("El nombre del artista no puede estar vacío"),
  check("artist.nickname")
    .optional()
    .notEmpty()
    .withMessage("El apodo del artista no puede estar vacío"),
  check("artist.edad")
    .optional()
    .isNumeric()
    .withMessage("La edad debe ser un número"),
  check("album")
    .optional()
    .notEmpty()
    .withMessage("El nombre del álbum no puede estar vacío"),
  check("cover")
    .optional()
    .notEmpty()
    .withMessage("El cover no puede estar vacío"),
  validatorResults,
];

// Valida que el "id" para eliminar sea un MongoID válido
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
