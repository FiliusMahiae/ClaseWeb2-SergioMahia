const { handleHttpError } = require("../utils/handleError");

const comprobarRol = (roles) => (req, res, next) => {
  try {
    if (!req.user.role.includes(roles)) {
      handleHttpError(res, "NOT_ALLOWED", 403);
      return;
    }
    next();
  } catch (err) {
    handleHttpError(res, "ERROR_NOT_PERMISSION", 403);
  }
};

module.exports = comprobarRol;
