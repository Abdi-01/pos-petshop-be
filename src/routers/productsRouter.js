const express = require("express");
const { productsController } = require("../controllers");
const { readToken } = require("../helper/jwt");
const route = express.Router();

route.post("/", readToken, productsController.getAllProducts);

module.exports = route