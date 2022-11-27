/* eslint-disable no-undef */
const supertest = require("supertest");

const app = require("../../index");
const {db} = require("../db");

const request = supertest(app);

describe("when the admin sears for information", () => {
  beforeAll(async function () {
    require("../../index.js");
    await db.sync({force: true});
  });

  afterEach(async function () {
    server = require("../../index.js");
    await db.sync({force: true});
  });

  afterAll(async function () {
    await db.sync({force: true});
    await db.close();
  });

  it("should respond when the token is not provided", async (done) => {
    const res = await request.get("/admin/getAllInformation").set("Accept", "application/json");

    expect(res.body.msg).toEqual("Tonken invalido o inexistente");
    done();
  });

  it("should respond when the is authorized", async (done) => {
    // creating a new admin
    await request
      .post(`/register`)
      .send({
        fullName: "tomas shanahan",
        email: "admin@hotmail.com",
        password: "admin12345",
        rol: "Admin",
      })
      .set("Accept", "application/json");

    // login with the admin to resive the token
    const loginTheNewUserToTakeTheToken = await request
      .post(`/login`)
      .send({email: "admin@hotmail.com", password: "admin12345"})
      .set("Accept", "application/json");

    // making the actual request to check if its working right
    const res = await request
      .get("/admin/getAllInformation")
      .set("Authorization", `Bearer ${loginTheNewUserToTakeTheToken.body.token}`)
      .set("Accept", "application/json");

    expect(Object.keys(res.body)).toEqual([
      "casaPrincipal",
      "exAgroinsumos",
      "taller",
      "hangar",
      "oficina",
      "balanza",
      "agroinsumos",
      "camaras",
    ]);
    done();
  });
});
