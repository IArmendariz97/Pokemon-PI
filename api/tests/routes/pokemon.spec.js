/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
  image: "url_de_la_imagen",
  imageback: "url_de_la_imagen_back",
  life: 100,
  attack: 50,
  defense: 30,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  // Desactivar restricciones de clave externa antes de las pruebas
  before(() => {
    conn.query("SET FOREIGN_KEY_CHECKS = 0");
  });

  // Reactivar restricciones de clave externa después de las pruebas
  after(() => {
    conn.query("SET FOREIGN_KEY_CHECKS = 1");
  });
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
});
