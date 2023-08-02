const express = require("express");
const typesRouter = express.Router();

const { getTypes } = require("../controllers/typesController.js");

typesRouter.get("/", getTypes);

module.exports = typesRouter;
