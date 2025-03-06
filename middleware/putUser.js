const { handleHttpError } = require("../utils/handleError");

const putUserMiddleware = async (req, res, next) => {
  try {
    if (req.user.role.includes("user") && req.user._id == req.params.id) {
      req.body.role = ["user"];
    } else if (req.user.role.includes("user")) {
      handleHttpError(res, "ERROR_NOT_YOUR_USER", 403);
    }
    next();
  } catch (err) {}
};

module.exports = putUserMiddleware;
