const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const register = async (req, res) => {
  try {
    const cleanData = matchedData(req);
    const password = await encrypt(cleanData.password);
    const body = { ...cleanData, password };

    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send(data);
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const login = async (req, res) => {
  try {
    const cleanData = matchedData(req);
    const user = await usersModel.findOne({ email: cleanData.email });

    if (!user) {
      return handleHttpError(res, "USER_NOT_EXISTS", 404);
    }

    const checkPassword = await compare(cleanData.password, user.password);
    if (!checkPassword) {
      return handleHttpError(res, "INVALID_PASSWORD", 401);
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send(data);
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { register, login };
