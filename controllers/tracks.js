const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});
    res.send(data);
  } catch (error) {
    handleHttpError(resizeBy, "ERROR_GET_ITEMS", 403);
  }
};

// Obtiene un item en base al parámetro "id"
const getItem = (req, res) => {
  const { id } = req.params;
  // Respuesta de prueba: simplemente se devuelve un mensaje con el id
  res.send({ data: `Item con id ${id}` });
};

// Crea un nuevo item usando los datos enviados en el cuerpo de la petición
const createItem = async (req, res) => {
  try {
    const body = matchedData(req); //Datos ya filtrados
    const data = await tracksModel.create(body);
    res.send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedItem = await tracksModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Devuelve el documento actualizado
    });

    if (!updatedItem) {
      return res
        .status(404)
        .send({ message: `No se encontró un item con id ${id}` });
    }

    res.send({
      message: `Item con id ${id} actualizado correctamente`,
      data: updatedItem,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al actualizar el item", error: error.message });
  }
};

// Elimina un item en base al "id"
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await tracksModel.delete({ _id: id });

    if (!deletedItem) {
      return res
        .status(404)
        .send({ message: `No se encontró un item con id ${id}` });
    }

    res.send({ message: `Item con id ${id} eliminado correctamente` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al eliminar el item", error: error.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
