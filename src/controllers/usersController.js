const model = require('../models');
const { createToken } = require('../helper/jwt');
const { users, sequelize } = require('../models');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');


let salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async (req, res, next) => {
        try {
            console.log("Data dari req :", req.body);

            let get = await model.users.findAll({
                where: ({ username: req.body.username })
            });

            if (get.length > 0) {
                // console.log("ini dari get:", get[0].dataValues);
                // get[0].dataValues.role_id = get[0].dataValues.role_id.role_id
                // console.log(role_id);

                bcrypt.compareSync(req.body.password, get[0].dataValues.password);

                let {id, uu_id, username, email, role_id } = get[0].dataValues
                let token = createToken({id, uu_id, email });
                return res.status(200).send({
                    success: true,
                    message: "login success",
                    // data: username, token, role
                    username: username,
                    role_id: role_id,
                    token: token

                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: "account or password salah"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);

        }
    },

    keepLogin: async (req, res, next) => {
        try {
            console.log("Decript token :", req.decript);
            let get = await model.users.findAll({
                attributes: ["uu_id", "role_id", "username"],
                where: ({ uu_id: req.decript.uu_id })
            });
            // get [0].dataValues.role_id = get[0].dataValues.role_id.role_id;
            let { uu_id, username, email, role_id } = get[0].dataValues;
            let token = createToken({ uu_id, email });
            return res.status(200).send({
                success: true,
                username: username,
                role_id: role_id,
                token: token
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            console.log(`req.body :`, req.body);
            let cekUser = await model.users.findAll({
                where: sequelize.or(
                    { username: req.body.username },
                    { email: req.body.email }
                )
            });

            if (cekUser.length == 0) {
                console.log(`data before hash :`, req.body);
                req.body.password = bcrypt.hashSync(req.body.password, salt)
                console.log(`data after hash :`, req.body);

                const uu_id = uuidv4();
                const { name, username, email, phone, password, role_id } = req.body


                let regis = await model.users.create({
                    uu_id, name, username, email, phone, password, role_id
                });

                return res.status(200).send({
                    success: true,
                    message: "account registered",
                    data: regis
                })

            } else {
                return res.status(400).send({
                    success: false,
                    message: "email or username exist"
                })
            }
        } catch (error) {
            next(error)
        }
    },

    getAllUser: async (req, res, next) => {
        try {
            let data = await model.users.findAll({
                attributes: ["name", "email", "phone", "uu_id"],
                where: {
                    isDeleted: 0
                },
                include: [{ model: model.role, attributes: ["role"] }]
            })

            return res.status(200).send(data)

        } catch (error) {
            next(error)
        }
    },
    deleteUser: async (req, res, next) => {
        console.log(`ini req.params`, req.params);
        try {
            let deleteUser = model.users.update({ isDeleted: 1 }, {
                where: {
                    uu_id : req.params.uu_id
                }
            })

            console.log("deleteUser : ", deleteUser);

            res.status(200).send({
                success: true,
                message: "user deleted"
            })

        } catch (error) {
            next(error)
        }
    }
}