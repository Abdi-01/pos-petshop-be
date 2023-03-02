const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const { usersController} = require('../controllers');
const { readToken } = require('../helper/jwt');
const { checkUser } = require('../helper/validator');

route.post('/login', usersController.login);
route.get('/keep-login', readToken, usersController.keepLogin);

module.exports = route;