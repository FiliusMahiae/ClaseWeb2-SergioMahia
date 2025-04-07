const supertest = require("supertest");
const { app, server } = require("../app.js");
const mongoose = require("mongoose");
const { usersModel } = require("../models/index.js");
const { encrypt } = require("../utils/handlePassword.js");
const { tokenSign } = require("../utils/handleJwt");

const initialUsers = [
  {
    name: "Marcos",
    age: 23,
    email: "marcos@correo.es",
    password: "mipassword",
  },
];

beforeAll(async () => {
  await new Promise((resolve) =>
    mongoose.connection.once("connected", resolve)
  );
  await usersModel.deleteMany({});
  const password = await encrypt(initialUsers[0].password);
  const body = initialUsers[0];
  body.password = password;
  const userData = await usersModel.create(body);
  userData.set("password", undefined, { strict: false });
  token = await tokenSign(userData, process.env.JWT_SECRET);
});

const api = supertest(app);

it("should get all users", async () => {
  const response = await api
    .get("/users")
    .auth(token, { type: "bearer" })
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body.length).toBe(1);
});

afterAll(async () => {
  server.close();
  await mongoose.connection.close();
});
