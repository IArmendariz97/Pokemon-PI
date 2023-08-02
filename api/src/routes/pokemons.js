const express = require("express");
const pokemonsRouter = express.Router();

const {
  getPokemonByName,
  getPokemons,
  getPokemonById,
  createPokemon,
} = require("../controllers/pokemonsController");

pokemonsRouter.get("/name", getPokemonByName);
pokemonsRouter.get("/:idPokemon", getPokemonById);
pokemonsRouter.get("/", getPokemons);
pokemonsRouter.post("/", createPokemon);

module.exports = pokemonsRouter;
