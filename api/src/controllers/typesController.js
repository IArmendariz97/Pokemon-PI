const axios = require("axios");
const { Type } = require("../db.js");

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
    return res.stats(500).json(error.message);
  }
}

module.exports = { getTypes };
