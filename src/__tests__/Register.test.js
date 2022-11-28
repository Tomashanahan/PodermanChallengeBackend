/* eslint-disable no-undef */
const supertest = require("supertest");

const {db} = require("../db");
const app = require("../../index"); // Link to your app file

const request = supertest(app);

describe("when the user creates an account", () => {
  beforeAll(async function (done) {
    require("../../index.js");
    await db.sync({force: true});
    done();
  });

  afterEach(async function (done) {
    require("../../index.js");
    await db.sync({force: true});
    done();
  });

  afterAll(async function (done) {
    await db.sync({force: true});
    await db.close();
    done();
  });

  it("should respond when the user exists", async (done) => {
    const createUser = await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "newUser@hotmial.com",
        team: "Microinformatica",
        password: "admin12345",
      })
      .set("Accept", "application/json");

    expect(createUser.body.fullName).toBe("tomas shanahan");
    expect(createUser.body.email).toBe("newUser@hotmial.com");
    expect(createUser.body.team).toBe("Microinformatica");
    done();
  });

  it("should respond when the user creates an Admin", async (done) => {
    const createUser = await request
      .post(`/register`)
      .send({
        fullName: "Admin",
        email: "admin@hotmial.com",
        password: "admin12345",
        rol: "Admin",
      })
      .set("Accept", "application/json");

    expect(createUser.body.fullName).toBe("Admin");
    expect(createUser.body.email).toBe("admin@hotmial.com");
    expect(createUser.body.rol).toBe("Admin");
    done();
  });

  it("should respond when the user exists", async (done) => {
    // creating a user to have the message error
    await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "newUser@hotmial.com",
        team: "Microinformatica",
        password: "admin12345",
      })
      .set("Accept", "application/json");

    const createUser = await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "newUser@hotmial.com",
        team: "Microinformatica",
        password: "admin12345",
      })
      .set("Accept", "application/json");

    expect(createUser.body.msg).toBe("El correo ya existe");
    done();
  });
});
