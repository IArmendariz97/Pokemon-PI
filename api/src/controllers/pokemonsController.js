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
        const { id, name, sprites, stats, types } = requestData.data;
        const typesVector = types.map((type) => {
          const id = type.type.url.split("/")[6];
          return {
            id,
            name: type.type.name,
          };
        });
        const { base_stat } = stats.find((stat) => stat.stat.name === "attack");
        const pokemonData = {
          id,
          name,
          image: sprites.front_default,
          imageback: sprites.back_default,
          types: typesVector,
          origin: "api",
          attack: base_stat,
        };
        return pokemonData;
      })
    );
    if (next) {
      nextURL = next;
    } else {
      try {
        nextURL = "https://pokeapi.co/api/v2/pokemon";
        pokemonsWithTypes = await Pokemon.findAll({ include: Type });
        const pokemonsDB = pokemonsWithTypes.map((pokemon) => {
          return (pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            types: pokemon.types.map((type) => {
              type.name, type.id;
            }),
            origin: "db",
            attack: pokemon.attack,
            imageback: pokemon.imageback,
          });
        });
        return res.status(200).json(pokemonsDB);
      } catch (error) {
        return res.status(500).send(error.message);
      }
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
      image2: sprites.other["official-artwork"].front_default,

      life: stats.map((stat) => {
        if (stat.stat.name === "hp") {
          return stat.base_stat;
        }
      }),
      attack: stats.map((stat) => {
        if (stat.stat.name === "attack") {
          return stat.base_stat;
        }
      }),
      defense: stats.map((stat) => {
        if (stat.stat.name === "defense") {
          return stat.base_stat;
        }
      }),
      speed: stats.map((stat) => {
        if (stat.stat.name === "speed") {
          return stat.base_stat;
        }
      }),
      height,
      weight,
    };
    return res.status(200).json(pokemon);
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
    return res.status(500).json(error.message);
  }
}

async function getPokemonByName(req, res) {
  const { name } = req.query;
  console.log(name);
  try {
    const pokemondb = await Pokemon.findOne({
      include: Type,
      where: {
        name: name,
      },
    });
    if (pokemondb) {
      const pokemonListo = {
        id: pokemondb.id,
        name: pokemondb.name,
        image: pokemondb.image,
        imageback: pokemondb.imageback,
        types: pokemondb.types.map((type) => ({
          name: type.name,
          id: type.id,
        })),
        origin: "db",
        attack: pokemondb.attack,
      };
      return res.status(200).json(pokemonListo);
    }
    const apiRequest = await axios(`${URL}${name}`);
    if (apiRequest.status === 200) {
      const { id, name, sprites, stats, types } = apiRequest.data;
      const typesVector = types.map((type) => {
        const id = type.type.url.split("/")[6];
        return {
          id,
          name: type.type.name,
        };
      });
      const pokemonData = {
        id,
        name,
        image: sprites.front_default,
        imageback: sprites.back_default,
        types: typesVector,
        origin: "api",
        attack: stats[1].base_stat,
      };
      return res.status(200).json(pokemonData);
    }
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
    return res.status(404).json({ error: "Pokémon not found" });
  }
}

async function createPokemon(req, res) {
  const {
    id,
    name,
    image,
    imageback,
    life,
    attack,
    defense,
    speed,
    weight,
    height,
    types,
  } = req.body;
  console.log(types);
  if (!name || !image || !life || !attack || !defense) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const pokemonCreado = await Pokemon.create({
      id,
      name,
      image,
      imageback,
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
