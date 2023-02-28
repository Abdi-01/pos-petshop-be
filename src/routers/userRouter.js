const route = require("express").Router();
const { userController } = require("../controllers")

route.post("/register", userController.register);
route.get("/getalluser", userController.getAllUser);

module.exports = route;