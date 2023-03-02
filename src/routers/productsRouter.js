const express = require('express');
const route = express.Router();
const { productsController } = require('../controllers');
const jwt = require('jsonwebtoken');
const { readToken } = require('../helper/jwt');



route.get('/',productsController.allProducts );
route.post("/list", readToken, productsController.list);

module.exports = route;