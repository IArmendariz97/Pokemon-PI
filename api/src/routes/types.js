const express = require("express");
const typesRouter = express.Router();

const { getTypes, getTypeInfo } = require("../controllers/typesController.js");

typesRouter.get("/:idTypes", getTypeInfo);
typesRouter.get("/", getTypes);

module.exports = typesRouter;
