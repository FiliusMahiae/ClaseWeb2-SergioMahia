const { matchedData } = require("express-validator");
const { usersModel } = require("../models"); // Asegúrate de tener definido usersModel en tus modelos
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    const data = await usersModel.find({});
    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS", 403);
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usersModel.findById(id);
    if (!data) {
      return res
        .status(404)
        .send({ message: `No se encontró un usuario con id ${id}` });
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM", 403);
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req); // Datos filtrados según las validaciones
    const data = await usersModel.create(body);
    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedItem = await usersModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Devuelve el documento actualizado
    });
    if (!updatedItem) {
      return res
        .status(404)
        .send({ message: `No se encontró un usuario con id ${id}` });
    }
    res.send({
      message: `Usuario con id ${id} actualizado correctamente`,
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await usersModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res
        .status(404)
        .send({ message: `No se encontró un usuario con id ${id}` });
    }
    res.send({ message: `Usuario con id ${id} eliminado correctamente` });
  } catch (error) {
    res.status(500).send({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
