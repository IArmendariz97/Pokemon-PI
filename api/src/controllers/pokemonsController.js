const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { Op } = require("sequelize");

let nextURL = "https://pokeapi.co/api/v2/pokemon";
const URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemons(req, res) {
  try {
    const apiRequest = await axios(nextURL);
    const { results, next } = apiRequest.data;
    const pokemons = await Promise.all(
      results.map(async (pokemon) => {
        const requestData = await axios(pokemon.url);
        const { id, name, sprites, stats, height, weight } = requestData.data;
        const pokemonData = {
          id,
          name,
          image: sprites.front_default,
          life: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[3].base_stat,
          height,
          weight,
        };
        return pokemonData;
      })
    );
    if (next) {
      nextURL = next;
    } else {
      nextURL = "https://pokeapi.co/api/v2/pokemon";
    }
    return res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
    return res.status(500).send(error.message);
  }
}

async function getPokemonById(req, res) {
  const { idPokemon } = req.params;
  try {
    const pokemondb = await Pokemon.findByPk(idPokemon);
    if (pokemondb) {
      return res.status(200).json(pokemondb);
    }

    const apiRequest = await axios(`${URL}${idPokemon}`);

    const { data } = apiRequest;
    const { id, name, sprites, stats, height, weight } = data;
    const pokemon = {
      id,
      name,
      image: sprites.front_default,
      life: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[3].base_stat,
      height,
      weight,
    };
    return res.status(200).json(pokemon);
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
    return res.stats(500).json(error.message);
  }
}

async function getPokemonByName(req, res) {
  const { name } = req.query;

  try {
    const apiRequest = await axios(`${URL}${name}`);
    if (apiRequest.status === 200) {
      const { data } = apiRequest;
      const { id, name, sprites, stats, height, weight } = data;
      const pokemon = {
        id,
        name,
        image: sprites.front_default,
        life: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[3].base_stat,
        height,
        weight,
      };
      return res.status(200).json(pokemon);
    }
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
    return res.stats(500).json(error.message);
  }
}

async function createPokemon(req, res) {
  const {
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    weight,
    height,
    types,
  } = req.body;
  if (!name || !image || !life || !attack || !defense) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const pokemonCreado = await Pokemon.create({
      id,
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    const existingTypes = await Type.findAll({
      where: {
        name: {
          [Op.in]: types.map((type) => type.toLowerCase()),
        },
      },
    });

    await pokemonCreado.setTypes(existingTypes);
    return res.status(200).json({ pokemonCreado, existingTypes });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  getPokemonByName,
  getPokemons,
  getPokemonById,
  createPokemon,
};
