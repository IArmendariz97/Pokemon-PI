const axios = require("axios");
const { Type, Pokemon } = require("../db.js");
const { Op } = require("sequelize");

const URLTypes = "https://pokeapi.co/api/v2/type/";

async function getTypes(req, res) {
  try {
    const types = await Type.findAll();
    if (types.length !== 0) {
      return res.status(200).json(types);
    }
    const typesFromApi = await axios(URLTypes);
    const { results } = typesFromApi.data;
    const savedTypes = await Promise.all(
      results.map(async (type) => {
        const savedType = await Type.create({
          id: type.url.split("/")[type.url.split("/").length - 2],
          name: type.name,
        });
        return savedType;
      })
    );
    return res.status(200).json(savedTypes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function getTypeInfo(req, res) {
  const { idTypes } = req.params;
  let pokemonCount = 0; // Variable para contar la cantidad de Pokémon procesados
  const maxPokemonCount = 20;
  try {
    const apiRequest = await axios(`${URLTypes}${idTypes}`);
    const { pokemon } = apiRequest.data;
    const pokemons = [];
    for (const entry of pokemon) {
      if (pokemonCount >= maxPokemonCount) {
        break; // Sal del bucle si ya alcanzaste el límite
      }
      const requestData = await axios(entry.pokemon.url);
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
      console.log(pokemonCount);
      pokemonCount++;
      if (pokemonData.id) {
        pokemons.push(pokemonData); // Agrega el Pokémon procesado al arreglo
      }
    }
    const dbTypes = await Type.findByPk(idTypes, {
      include: {
        model: Pokemon,
        through: {
          attributes: [], // Evita que se incluyan las columnas de la tabla intermedia en los resultados
        },
      },
    });

    const pokemonsdb = await Pokemon.findAll({
      include: Type,
      where: {
        id: {
          [Op.in]: dbTypes.pokemons.map((pokemon) => pokemon.id),
        },
      },
    });
    if (pokemonsdb.length > 0) {
      pokemons.push(pokemonsdb[0]); // Agrega los Pokémon de la base de datos al arreglo
    }
    return res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { getTypes, getTypeInfo };
