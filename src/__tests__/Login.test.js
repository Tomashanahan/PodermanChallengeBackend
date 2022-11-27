/* eslint-disable no-undef */
const supertest = require("supertest");

const app = require("../../index"); // Link to your app file
const {db} = require("../db");
const request = supertest(app);

describe("when user login", () => {
  beforeAll(async function () {
    require("../../index.js");
    await db.sync({force: true});
  });

  afterEach(async function () {
    require("../../index.js");
    await db.sync({force: true});
  });

  afterAll(async function () {
    await db.sync({force: true});
    await db.close();
  });

  it("should respond when the user doesn't exists", async (done) => {
    const res = await request
      .post(`/login`)
      .send({email: "usuarioNoExiste@hotmail.com", password: "admin"})
      .set("Accept", "application/json");

    expect(res.body.msg).toBe("El usuario no existe");
    done();
  });

  it("should respond when the user exists", async (done) => {
    // creating a new user
    await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "t@hotmial.com",
        password: "admin12345",
      })
      .set("Accept", "application/json");

    // checking if now exists
    const res = await request
      .post(`/login`)
      .send({email: "t@hotmial.com", password: "admin12345"})
      .set("Accept", "application/json");

    expect(res.body.fullName).toBe("tomas shanahan");
    expect(res.body.email).toBe("t@hotmial.com");
    done();
  });

  it("when the user put the wrong passord", async (done) => {
    // creating a new user
    await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "t@hotmial.com",
        password: "admin12345",
      })
      .set("Accept", "application/json");

    const res = await request
      .post(`/login`)
      .send({email: "t@hotmial.com", password: "wrongPassword"})
      .set("Accept", "application/json");

    expect(res.body.msg).toBe("Password incorrecto");
    done();
  });
});
