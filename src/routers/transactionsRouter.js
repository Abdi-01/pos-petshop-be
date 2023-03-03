const express = require("express");
const route = express.Router();
const { readToken } = require('../helper/jwt');
const { transactionsController } = require("../controllers")

route.post("/", readToken, transactionsController.addTransaction);

module.exports = route