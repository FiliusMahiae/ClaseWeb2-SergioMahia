const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "Api-publica-123") {
      next();
    } else {
      res.status(403).send("api key no es correcto");
    }
  } catch (error) {
    console.error("Error en getItems", error);
    handleHttpError(res, "ERROR_API_KEY", 403);
  }
};

module.exports = customHeader;
