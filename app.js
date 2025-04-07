require("dotenv").config();

const loggerStream = require("./utils/handleLogger");
const morganBody = require("morgan-body");

const express = require("express");
const cors = require("cors");
const { sequelize, dbConnectMySql } = require("./config/mysql");
const dbConnect = require("./config/mongo");

const app = express();

morganBody(app, {
  noColors: true,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
  stream: loggerStream,
});

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.use("/", require("./routes/index"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Servidor escuchando en el puerto " + port);

  if (process.env.ENGINE_DB === "nosql") {
    dbConnect();
  } else {
    dbConnectMySql();
    sequelize.sync();
  }
});

module.exports = { app, server };
