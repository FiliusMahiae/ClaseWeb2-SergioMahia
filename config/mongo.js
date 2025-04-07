const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri =
    process.env.NODE_ENV === "test"
      ? process.env.DB_URI_TEST
      : process.env.DB_URI;
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(db_uri);
  } catch (error) {
    console.error(`Error conectando a la BD: ${error}`);
  }

  mongoose.connection.on("connected", () => console.log("Conectado a la BBDD"));
};

module.exports = dbConnect;
