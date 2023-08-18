const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync());
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        return Pokemon.create({
          name: "Pikachu",
          image:
            "https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg",
          imageback:
            "https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg",
          life: 80,
          attack: 89,
          defense: 90,
        });
      });
    });
  });
});
